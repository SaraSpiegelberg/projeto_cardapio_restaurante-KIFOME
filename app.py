from flask import Flask, jsonify, request, send_from_directory
import json
import os
import csv
from datetime import datetime

app = Flask(__name__, static_folder='static', static_url_path='')
CSV_FILE = 'orders.csv'

# Mapeamentos bidirecionais de cores/emojis para identificação visual no CSV
STATUS_MAP_WRITE = {
    'Pendente': '🔴 Pendente',
    'Preparando': '🟡 Preparando',
    'A Caminho': '🔵 A Caminho',
    'Entregue': '🟢 Entregue',
    'Cancelado': '⚪ Cancelado'
}
STATUS_MAP_READ = {v: k for k, v in STATUS_MAP_WRITE.items()}

PAYMENT_MAP_WRITE = {
    'Dinheiro': '💵 Dinheiro',
    'Pix': '🌀 Pix',
    'Cartão': '💳 Cartão'
}
PAYMENT_MAP_READ = {v: k for k, v in PAYMENT_MAP_WRITE.items()}

def format_items_to_readable_string(items):
    """
    Converte a estrutura complexa de lanches em uma string amigável e limpa.
    """
    if isinstance(items, str):
        return items
        
    if not isinstance(items, list):
        return str(items)
        
    formatted_items = []
    for item in items:
        qty = item.get('qty', 1)
        name = item.get('name', 'Item')
        additions = item.get('additions', [])
        notes = item.get('notes', '')
        
        item_str = f"{qty}x {name}"
        
        details = []
        if additions and isinstance(additions, list):
            clean_adds = [str(a) for a in additions if a]
            if clean_adds:
                details.append("Adicionais: " + ", ".join(clean_adds))
                
        if notes:
            details.append(f'Obs: "{notes}"')
            
        if details:
            item_str += f" ({' | '.join(details)})"
            
        formatted_items.append(item_str)
        
    return "; ".join(formatted_items)

def init_csv():
    """
    Inicializa o arquivo CSV se ele não existir com o cabeçalho.
    """
    if not os.path.exists(CSV_FILE):
        with open(CSV_FILE, mode='w', newline='', encoding='utf-8') as f:
            writer = csv.writer(f)
            writer.writerow([
                'id', 'customer_name', 'customer_phone', 'customer_address', 
                'payment_method', 'change_for', 'items', 'subtotal', 
                'delivery_fee', 'total', 'status', 'created_at'
            ])

def read_orders_from_csv():
    """
    Lê o arquivo CSV de pedidos e limpa os emojis das chaves para compatibilidade com a API.
    """
    init_csv()
    orders = []
    with open(CSV_FILE, mode='r', newline='', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            row['id'] = int(row['id'])
            row['subtotal'] = float(row['subtotal'])
            row['delivery_fee'] = float(row['delivery_fee'])
            row['total'] = float(row['total'])
            
            # Limpa e mapeia de volta os emojis para strings simples para a API
            status_val = row['status']
            row['status'] = STATUS_MAP_READ.get(status_val, status_val)
            
            payment_val = row['payment_method']
            row['payment_method'] = PAYMENT_MAP_READ.get(payment_val, payment_val)
            
            try:
                if row['items'].startswith('[') or row['items'].startswith('{'):
                    row['items'] = json.loads(row['items'])
            except Exception:
                pass
                
            orders.append(row)
    return orders

def write_orders_to_csv(orders):
    """
    Grava os pedidos no CSV aplicando os emojis coloridos nas colunas de Status e Pagamento.
    """
    with open(CSV_FILE, mode='w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow([
            'id', 'customer_name', 'customer_phone', 'customer_address', 
            'payment_method', 'change_for', 'items', 'subtotal', 
            'delivery_fee', 'total', 'status', 'created_at'
        ])
        for order in orders:
            items_str = format_items_to_readable_string(order['items'])
            
            # Aplica os emojis coloridos nas células correspondentes do CSV
            status_mapped = STATUS_MAP_WRITE.get(order['status'], order['status'])
            payment_mapped = PAYMENT_MAP_WRITE.get(order['payment_method'], order['payment_method'])
            
            writer.writerow([
                order['id'],
                order['customer_name'],
                order['customer_phone'],
                order['customer_address'],
                payment_mapped,
                order.get('change_for') or '',
                items_str,
                order['subtotal'],
                order['delivery_fee'],
                order['total'],
                status_mapped,
                order['created_at']
            ])

# Garante a criação do CSV ao iniciar o servidor
init_csv()

@app.route('/')
def serve_index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/admin')
def serve_admin():
    return send_from_directory(app.static_folder, 'admin.html')

@app.route('/api/orders', methods=['POST'])
def create_order():
    try:
        data = request.json
        if not data:
            return jsonify({'error': 'Dados inválidos'}), 400
        
        required_fields = ['customer_name', 'customer_phone', 'customer_address', 'payment_method', 'items', 'subtotal', 'delivery_fee', 'total']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'O campo {field} é obrigatório'}), 400
        
        orders = read_orders_from_csv()
        
        # Gerador de ID incremental simples baseado no maior ID existente
        next_id = max([o['id'] for o in orders]) + 1 if orders else 1
        
        readable_items = format_items_to_readable_string(data['items'])
        
        new_order = {
            'id': next_id,
            'customer_name': data['customer_name'],
            'customer_phone': data['customer_phone'],
            'customer_address': data['customer_address'],
            'payment_method': data['payment_method'],
            'change_for': data.get('change_for'),
            'items': readable_items,
            'subtotal': float(data['subtotal']),
            'delivery_fee': float(data['delivery_fee']),
            'total': float(data['total']),
            'status': 'Pendente',
            'created_at': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        }
        
        orders.append(new_order)
        write_orders_to_csv(orders)
        
        return jsonify({'success': True, 'order_id': next_id}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/orders', methods=['GET'])
def get_orders():
    try:
        orders = read_orders_from_csv()
        orders.sort(key=lambda x: x['created_at'], reverse=True)
        return jsonify(orders), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/orders/<int:order_id>/status', methods=['PUT'])
def update_order_status(order_id):
    try:
        data = request.json
        if not data or 'status' not in data:
            return jsonify({'error': 'O campo status é obrigatório'}), 400
        
        new_status = data['status']
        valid_statuses = ['Pendente', 'Preparando', 'A Caminho', 'Entregue', 'Cancelado']
        if new_status not in valid_statuses:
            return jsonify({'error': f'Status inválido. Deve ser um de: {", ".join(valid_statuses)}'}), 400
            
        orders = read_orders_from_csv()
        found = False
        
        for order in orders:
            if order['id'] == order_id:
                order['status'] = new_status
                found = True
                break
                
        if not found:
            return jsonify({'error': 'Pedido não encontrado'}), 404
            
        write_orders_to_csv(orders)
        return jsonify({'success': True, 'message': 'Status atualizado com sucesso'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    # Cria diretórios estáticos se não existirem
    os.makedirs('static', exist_ok=True)
    os.makedirs('static/css', exist_ok=True)
    os.makedirs('static/js', exist_ok=True)
    os.makedirs('static/images', exist_ok=True)
    
    app.run(debug=True, port=5000)
