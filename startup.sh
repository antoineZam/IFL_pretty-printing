#!/bin/bash

# Clear terminal for clean start
clear

echo "========================================"
echo "  IFL Pretty Printing - Starting Up"
echo "========================================"
echo ""

# Start client dev server in background
echo "[1/2] Starting client dev server..."
cd client
npm run dev > /dev/null 2>&1 &
CLIENT_PID=$!
cd ..

# Give client a moment to start
sleep 2

# Start main server
echo "[2/2] Starting main server..."
echo ""
echo "========================================"
echo "  Servers running! Press Ctrl+C to stop"
echo "========================================"
echo ""

npm start

# Cleanup on exit
trap "kill $CLIENT_PID 2>/dev/null" EXIT
image.png