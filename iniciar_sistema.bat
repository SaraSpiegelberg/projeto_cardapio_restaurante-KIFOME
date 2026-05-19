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
if errorlevel 1 goto TryPy
set PYTHON_CMD=python
goto PythonOk

:TryPy
py --version >nul 2>&1
if errorlevel 1 goto NoPython
set PYTHON_CMD=py
goto PythonOk

:PythonOk
echo Python detectado com sucesso! (Utilizando executor: %PYTHON_CMD%)
echo.

:: Passo 2: Criar e ativar ambiente virtual local se nao existir
if exist ".venv" goto ActivateVenv
echo Criando ambiente virtual isolado (.venv)...
%PYTHON_CMD% -m venv .venv
if errorlevel 1 goto VenvError
echo Ambiente virtual criado com sucesso!
echo.

:ActivateVenv
echo Ativando ambiente virtual (.venv)...
call .venv\Scripts\activate.bat >nul 2>&1
if errorlevel 1 goto ActivateError
echo.

:: Passo 3: Instalar as dependencias necessarias
echo Atualizando o gerenciador pip e instalando dependencias (requirements.txt)...
python -m pip install --upgrade pip >nul 2>&1
pip install -r requirements.txt
if errorlevel 1 goto PipError
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
echo Para encerrar o site, basta fechar esta janela do terminal.
echo.
echo Executando app.py...
python app.py
goto End

:NoPython
color 0C
echo [ERRO] O Python nao foi detectado no seu computador!
echo Por favor, instale o Python 3 e marque a opcao "Add Python to PATH" durante a instalacao.
echo.
pause
exit /b

:VenvError
color 0C
echo [ERRO] Falha ao criar o ambiente virtual .venv!
echo Verifique se voce tem permissoes de gravacao nesta pasta.
echo.
pause
exit /b

:ActivateError
color 0C
echo [ERRO] Falha ao ativar o ambiente virtual (.venv)!
echo Verifique se a pasta .venv\Scripts\activate.bat existe.
echo.
pause
exit /b

:PipError
color 0C
echo [ERRO] Falha ao instalar as dependencias. Verifique sua conexao com a internet.
echo.
pause
exit /b

:End
pause
