@echo off
cls

echo ========================================
echo   IFL Pretty Printing - Starting Up
echo ========================================
echo.

echo [1/2] Starting client dev server...
cd client
start /B cmd /c "npm run dev >nul 2>&1"
cd ..

timeout /t 2 /nobreak >nul

echo [2/2] Starting main server...
echo.
echo ========================================
echo   Servers running! Press Ctrl+C to stop
echo ========================================
echo.

npm start

