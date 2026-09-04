#!/bin/bash
#
# Convenience wrapper around `npm run dev`.
#
# It used to launch Vite itself with a background `npm run dev`, register its
# cleanup `trap` on the LAST line -- after the blocking `npm start` -- so Ctrl+C
# ended the script before the trap ever armed and left an orphaned Vite process
# holding port 5173. It also sent the client's output to /dev/null, so the URL
# the operator actually needs was never printed.
#
# `npm run dev` uses concurrently, which propagates signals to both processes
# and interleaves their output. There is nothing left for this script to do
# except say what is about to happen.

set -euo pipefail

clear
echo "========================================"
echo "  IFL Pretty Printing - Starting Up"
echo "========================================"
echo ""
echo "  Vite (source, hot reload) : http://localhost:5173"
echo "  Express (built bundle)    : http://localhost:3000"
echo ""
echo "  Point OBS at 5173 while developing -- 3000 serves the LAST BUILD,"
echo "  which is not necessarily the code you are editing."
echo ""
echo "  Press Ctrl+C to stop both."
echo "========================================"
echo ""

exec npm run dev
