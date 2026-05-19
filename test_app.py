import unittest
import json
import os
from app import app, init_csv

class KiFomeTestCase(unittest.TestCase):
    
    def setUp(self):
        """
        Configura o ambiente de testes antes de cada caso de teste.
        """
        app.config['TESTING'] = True
        self.app = app.test_client()
        
        # Aponta o banco de dados para um arquivo temporário de testes CSV
        import app as app_module
        self.original_csv = app_module.CSV_FILE
        self.test_csv = 'test_orders.csv'
        app_module.CSV_FILE = self.test_csv
        
        # Inicializa o banco de dados de teste limpo
        if os.path.exists(self.test_csv):
            os.remove(self.test_csv)
        
        # Cria o arquivo CSV com o cabeçalho no diretório de testes
        init_csv()

    def tearDown(self):
        """
        Limpa o ambiente de testes após a execução de cada caso de teste.
        """
        # Restaura o banco de dados original no módulo
        import app as app_module
        app_module.CSV_FILE = self.original_csv
        
        # Remove o banco de dados temporário de testes CSV
        if os.path.exists(self.test_csv):
            try:
                os.remove(self.test_csv)
            except PermissionError:
                pass # Ignora se o arquivo ainda estiver travado por alguma conexão aberta

    def test_serve_static_pages(self):
        """
        1. Teste automatizado para verificar se as páginas HTML estáticas 
        do cliente e do administrador estão sendo servidas corretamente (Status 200 OK).
        """
        print("\n[TEST] Verificando entrega de paginas HTML...")
        
        # Página do Cliente (/)
        response_client = self.app.get('/')
        self.assertEqual(response_client.status_code, 200)
        
        # Página do Administrador (/admin)
        response_admin = self.app.get('/admin')
        self.assertEqual(response_admin.status_code, 200)
        
        print("-> Paginas estaticas sendo servidas com sucesso!")

    def test_create_and_retrieve_order(self):
        """
        2. Teste automatizado de API (POST /api/orders e GET /api/orders).
        Insere um pedido completo com lanche personalizado e valida se foi 
        salvo e recuperado com sucesso no arquivo CSV.
        """
        print("\n[TEST] Verificando criacao de pedido via API POST e recuperacao via GET no CSV...")
        
        payload = {
            "customer_name": "Carlos Eduardo",
            "customer_phone": "(51) 98765-4321",
            "customer_address": "Rua dos Lanches, 100",
            "payment_method": "Pix",
            "items": [
                {
                    "id": 3,
                    "name": "Xis Tudo",
                    "qty": 1,
                    "singlePrice": 29.90,
                    "totalPrice": 29.90,
                    "additions": ["Bacon Extra", "Queijo Duplo"],
                    "notes": "Sem cebola por favor!"
                }
            ],
            "subtotal": 29.90,
            "delivery_fee": 5.00,
            "total": 34.90
        }
        
        # Executa requisição POST para registrar pedido no CSV
        response = self.app.post(
            '/api/orders',
            data=json.dumps(payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 201)
        
        data = json.loads(response.data)
        self.assertTrue(data['success'])
        self.assertIn('order_id', data)
        order_id = data['order_id']
        
        # Recupera os pedidos via API GET e valida os campos persistidos nas linhas do CSV
        response_get = self.app.get('/api/orders')
        self.assertEqual(response_get.status_code, 200)
        
        orders = json.loads(response_get.data)
        self.assertEqual(len(orders), 1)
        self.assertEqual(orders[0]['id'], order_id)
        self.assertEqual(orders[0]['customer_name'], "Carlos Eduardo")
        self.assertEqual(orders[0]['status'], "Pendente")
        self.assertEqual(orders[0]['total'], 34.90)
        
        print(f"-> Pedido #{order_id} gravado e validado no arquivo CSV com sucesso!")

    def test_order_status_transitions(self):
        """
        3. Teste automatizado de Fluxo de Preparo (PUT /api/orders/<id>/status).
        Registra um pedido, transiciona seu status pelo fluxo Kanban e valida 
        as respostas de sucesso e modificações das células do CSV.
        """
        print("\n[TEST] Verificando transicoes de status no arquivo CSV...")
        
        # Cria pedido inicial
        payload = {
            "customer_name": "Ana Maria",
            "customer_phone": "(51) 91111-2222",
            "customer_address": "Av. Principal, 999",
            "payment_method": "Dinheiro",
            "change_for": "Troco para R$ 50",
            "items": "1x Cachorro Quente Simples",
            "subtotal": 14.00,
            "delivery_fee": 5.00,
            "total": 19.00
        }
        response = self.app.post(
            '/api/orders',
            data=json.dumps(payload),
            content_type='application/json'
        )
        order_id = json.loads(response.data)['order_id']
        
        # Passo A: Transiciona status para 'Preparando' (Entrou na chapa)
        res_prep = self.app.put(
            f'/api/orders/{order_id}/status',
            data=json.dumps({"status": "Preparando"}),
            content_type='application/json'
        )
        self.assertEqual(res_prep.status_code, 200)
        
        # Valida alteração
        res_get = self.app.get('/api/orders')
        orders = json.loads(res_get.data)
        self.assertEqual(orders[0]['status'], "Preparando")
        
        # Passo B: Tenta enviar um status inválido e valida o tratamento de erro (400 Bad Request)
        res_invalid = self.app.put(
            f'/api/orders/{order_id}/status',
            data=json.dumps({"status": "StatusQueNaoExiste"}),
            content_type='application/json'
        )
        self.assertEqual(res_invalid.status_code, 400)
        
        # Passo C: Transiciona status para 'A Caminho' (Saiu para entrega)
        res_ship = self.app.put(
            f'/api/orders/{order_id}/status',
            data=json.dumps({"status": "A Caminho"}),
            content_type='application/json'
        )
        self.assertEqual(res_ship.status_code, 200)
        
        # Passo D: Transiciona status para 'Entregue' (Pedido concluído)
        res_done = self.app.put(
            f'/api/orders/{order_id}/status',
            data=json.dumps({"status": "Entregue"}),
            content_type='application/json'
        )
        self.assertEqual(res_done.status_code, 200)
        
        # Valida status final nas células do CSV
        res_get_final = self.app.get('/api/orders')
        orders_final = json.loads(res_get_final.data)
        self.assertEqual(orders_final[0]['status'], "Entregue")
        
        print("-> Fluxo completo (Pendente -> Preparando -> A Caminho -> Entregue) validado com sucesso!")

if __name__ == '__main__':
    unittest.main()
