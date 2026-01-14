@echo off
echo Starting Digit Hacker Tool...

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Node.js is not installed. Please install Node.js 18+ first.
    exit /b 1
)

REM Backend setup
echo Setting up backend...
cd backend
if not exist "node_modules\" (
    echo Installing backend dependencies...
    call npm install
)

if not exist ".env" (
    echo .env file not found. Copying from .env.example...
    copy .env.example .env
    echo Please edit backend\.env with your configuration!
    exit /b 1
)

REM Start backend
echo Starting backend server...
start "Backend" cmd /k npm run dev

REM Wait a bit for backend to start
timeout /t 3 /nobreak >nul

REM Frontend setup
echo Setting up frontend...
cd ..\frontend
if not exist "node_modules\" (
    echo Installing frontend dependencies...
    call npm install
)

if not exist ".env" (
    echo .env file not found. Copying from .env.example...
    copy .env.example .env
    echo Please edit frontend\.env with your configuration!
    exit /b 1
)

REM Start frontend
echo Starting frontend server...
start "Frontend" cmd /k npm run dev

echo.
echo Both servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
echo.
