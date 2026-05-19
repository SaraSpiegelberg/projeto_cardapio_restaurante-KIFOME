# Ki Fome - Sistema de Lanchonete e Painel Administrativo

Este projeto consiste em uma solucao web completa para a gestao de pedidos de uma lanchonete comercial chamada Ki Fome. O sistema foi desenvolvido para atender tanto o cliente final, no processo de escolha de lanches e finalizacao da compra, quanto a equipe interna do estabelecimento, no controle de preparo e logistica de entregas.

O sistema dispensa a necessidade de bancos de dados relacionais complexos ou instalacao de drivers adicionais, utilizando uma planilha CSV como banco de dados fisico. Essa planilha passa por um pos-processamento inteligente no servidor para que seja legivel tanto por humanos (atraves de programas como Excel ou Google Planilhas) quanto por sistemas.

---

## Principais Funcionalidades

### Interface do Cliente
* Cardapio interativo estruturado em categorias por abas: Xis, Cachorro Quente, Torrada, Pastel e Bebidas.
* Carrinho de compras lateral interativo com calculo automatico de subtotal, taxa de entrega fixa e total geral.
* Modal de personalizacao de itens, permitindo a selecao de ingredientes adicionais (bacon, queijo duplo, ovo, maionese caseira extra) e digitacao de observacoes por item.
* Formulario de finalizacao de compra com validacao de campos (nome, telefone, endereco completo, forma de pagamento e campo para troco se for pago em dinheiro).
* Integracao via deep-linking que gera um link formatado para envio direto dos detalhes do pedido para o WhatsApp do estabelecimento.

### Painel Administrativo (Master-Detail POS)
* Dashboard analitico que exibe cartoes estatisticos em tempo real: faturamento total estimado, quantidade de pedidos pendentes, pedidos ativos na chapa ou em rota, e total de entregas concluidas.
* Layout de divisao lateral dupla (Master-Detail) otimizado para lidar com altos fluxos de dados sem poluir a visualizacao: a esquerda fica a fila de pedidos em formato compacto e rolavel; a direita fica a visualizacao detalhada do bilhete ativo.
* Filtros dinamicos em tempo real que agrupam a fila de pedidos por status (Todos, Pendentes, Na Chapa, A Caminho, Entregues e Cancelados) com contadores de quantidade em cada botao.
* Barra de busca em tempo real que filtra os pedidos por nome do cliente, endereco de entrega ou numero de identificacao.
* Sistema de alertas sonoros que detecta automaticamente a entrada de novos pedidos na fila para alertar a cozinha sem necessidade de atualizar a pagina.
* Atalho integrado na visualizacao de detalhes que abre uma conversa de chat direto no WhatsApp com o cliente selecionado.

### Banco de Dados em CSV Colorido
* Persistencia fisica completa baseada no arquivo orders.csv.
* Rotina de pos-processamento que converte as listas JSON de itens enviados pelo navegador em frases amigaveis de leitura humana (ex: 2x Xis Tudo com Adicional de Bacon).
* Traducao bidirecional automatica que insere identificadores unicode coloridos de cores para leitura humana rapida no Excel (ex: bolinhas vermelhas para status pendente, bolinhas verdes para entregue, e simbolos financeiros para o pagamento), enquanto limpa esses mesmos simbolos ao repassar as requisoes via API REST, evitando falhas nos scripts front-end.

### Suite de Testes Automatizada
* Suite de testes de integracao que roda testes simulados em ambiente mockado, garantindo a integridade dos arquivos originais de producao.
* Validacao de rotas de entrega de paginas estaticas, escrita de pedidos no arquivo e fluxo completo de transicao de status do Kanban (Pendente, Preparando, A Caminho, Entregue).

---

## Tecnologias Utilizadas

### Back-End
* Python: Linguagem de programacao principal.
* Flask: Microframework web utilizado para roteamento de paginas, entrega de assets estaticos e construcao da API REST.
* CSV (Python Standard Library): Manipulacao e persistencia de dados de pedidos de forma direta e estruturada.

### Front-End
* HTML5: Estrutura semantica das paginas da loja e do painel admin.
* CSS3: Estilizacao premium baseada em Custom Properties (variaveis CSS), cantos arredondados, sombras suaves, transicoes interativas e paleta HSL com foco nas cores Laranja e Azul. Layout totalmente responsivo para desktop, tablets e celulares.
* Javascript (Vanilla ES6): Manipulacao de estado do carrinho de compras, chamadas de API assincronas (Fetch API) e atualizacao dinamica da fila do lancheiro.

### Testes
* Unittest: Suite de testes nativa do Python para automacao e verificacao da integridade dos fluxos.

---

## Como Instalar e Rodar o Projeto

### Metodo Super Simplificado (Apenas Um Clique no Windows)
Se voce utiliza o sistema operacional Windows, nao e necessario executar nenhum comando ou configurar pastas manualmente no terminal. Basta seguir os passos:
1. Certifique-se de ter o Python 3 instalado no computador.
2. Baixe e extraia a pasta do projeto.
3. Dê um clique duplo no arquivo **`iniciar_sistema.bat`**.

O script ira verificar se o Python esta ativo, criar o ambiente virtual, instalar todas as dependencias do requirements.txt automaticamente, abrir o cardapio e o painel administrativo no seu navegador padrao e iniciar o servidor!

---

### Metodo Manual (Passo a Passo)

#### Pre-requisitos
Certifique-se de ter o Python 3 instalado em seu computador.

#### Passo 1: Clonar ou Baixar o Projeto
Baixe os arquivos do projeto para um diretorio local em sua maquina.

#### Passo 2: Instalar as Dependencias
Abra o terminal na pasta do projeto e instale a biblioteca Flask (listada no arquivo requirements.txt):
```bash
pip install -r requirements.txt
```

#### Passo 3: Iniciar o Servidor Web
Execute o arquivo do backend Python para iniciar o servidor local:
```bash
python app.py
```
O servidor estara ativo no endereco local: `http://127.0.0.1:5000`

#### Passo 4: Acessar as Interfaces no Navegador
* **Loja do Cliente:** Acesse `http://127.0.0.1:5000` para ver o cardapio e fazer pedidos.
* **Painel Administrativo:** Acesse `http://127.0.0.1:5000/admin` para monitorar a cozinha e gerenciar os pedidos.

#### Passo 5: Executar os Testes Automatizados
Para rodar a suite de testes automatizados e validar se todos os sistemas de escrita em banco e transicoes de status estao operando corretamente, execute o terminal com o comando:
```bash
python test_app.py
```
