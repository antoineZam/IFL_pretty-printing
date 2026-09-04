@echo off
REM
REM Convenience wrapper around `npm run dev`.
REM
REM It used to detach Vite with `start /B` and capture no PID and register no
REM cleanup, so Ctrl+C left a node process holding port 5173 -- after which the
REM next launch silently bound a different port. It also discarded the client's
REM output, so the URL the operator needs was never printed.
REM
REM `npm run dev` uses concurrently, which manages both processes and interleaves
REM their output.

cls

echo ========================================
echo   IFL Pretty Printing - Starting Up
echo ========================================
echo.
echo   Vite (source, hot reload) : http://localhost:5173
echo   Express (built bundle)    : http://localhost:3000
echo.
echo   Point OBS at 5173 while developing -- 3000 serves the LAST BUILD,
echo   which is not necessarily the code you are editing.
echo.
echo   Press Ctrl+C to stop both.
echo ========================================
echo.

call npm run dev
