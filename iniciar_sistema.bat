@echo off
title Ki Fome - Inicializador Automatico
color 0B

echo ===================================================
echo             SISTEMA KI FOME - INICIALIZADOR
echo ===================================================
echo.

:: Passo 1: Verificar instalacao do Python
echo Verificando se o Python esta instalado no sistema...
python --version >nul 2>&1
if %errorlevel% neq 0 (
    color 0C
    echo [ERRO] O Python nao foi detectado no seu computador!
    echo Por favor, instale o Python 3 e marque a opcao "Add Python to PATH" durante a instalacao.
    echo.
    pause
    exit /b
)
echo Python detectado com sucesso!
echo.

:: Passo 2: Criar e ativar ambiente virtual local se nao existir
if not exist ".venv" (
    echo Criando ambiente virtual isolado (.venv)...
    python -m venv .venv
    if %errorlevel% neq 0 (
        color 0C
        echo [ERRO] Falha ao criar o ambiente virtual.
        pause
        exit /b
    )
    echo Ambiente virtual criado com sucesso!
    echo.
)

echo Ativando ambiente virtual (.venv)...
call .venv\Scripts\activate
echo.

:: Passo 3: Instalar as dependencias necessarias
echo Atualizando o gerenciador pip e instalando dependencias (requirements.txt)...
python -m pip install --upgrade pip >nul 2>&1
pip install -r requirements.txt
if %errorlevel% neq 0 (
    color 0C
    echo [ERRO] Falha ao instalar as dependencias. Verifique sua conexao com a internet.
    pause
    exit /b
)
echo Dependencias instaladas e configuradas com sucesso!
echo.

:: Passo 4: Abrir as paginas no navegador padrao automaticamente
echo Iniciando o navegador com o Cardapio e o Painel Administrativo...
start http://127.0.0.1:5000
start http://127.0.0.1:5000/admin
echo.

:: Passo 5: Executar o servidor Flask
echo Servidor do Ki Fome Lanches esta ativo e rodando!
echo Mantenha esta janela do prompt de comando aberta para manter o site online.
echo Para encerrar o site, basta fechar esta janela.
echo.
echo Executando app.py...
python app.py

pause
