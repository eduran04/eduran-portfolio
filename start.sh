#!/usr/bin/env bash
# Start a local preview server for this static portfolio.
# Works in Git Bash, WSL, and macOS/Linux.
set -euo pipefail

cd "$(dirname "$0")"
PORT="${PORT:-8000}"
URL="http://localhost:${PORT}"

open_browser() {
  if command -v wslview >/dev/null 2>&1; then
    wslview "$URL" >/dev/null 2>&1 || true
  elif command -v powershell.exe >/dev/null 2>&1; then
    powershell.exe -NoProfile -Command "Start-Process '${URL}'" >/dev/null 2>&1 || true
  elif command -v cmd.exe >/dev/null 2>&1; then
    cmd.exe /c start "" "$URL" >/dev/null 2>&1 || true
  elif command -v xdg-open >/dev/null 2>&1; then
    xdg-open "$URL" >/dev/null 2>&1 || true
  elif command -v open >/dev/null 2>&1; then
    open "$URL" >/dev/null 2>&1 || true
  fi
}

serve_with_python() {
  local py="$1"
  echo "Serving ${PWD} at ${URL}"
  echo "Press Ctrl+C to stop."
  echo
  open_browser
  exec "$py" -m http.server "$PORT"
}

if command -v python3 >/dev/null 2>&1 && python3 -c "import http.server" >/dev/null 2>&1; then
  serve_with_python python3
elif command -v python >/dev/null 2>&1 && python -c "import http.server" >/dev/null 2>&1; then
  serve_with_python python
elif command -v py >/dev/null 2>&1 && py -3 -c "import http.server" >/dev/null 2>&1; then
  echo "Serving ${PWD} at ${URL}"
  echo "Press Ctrl+C to stop."
  echo
  open_browser
  exec py -3 -m http.server "$PORT"
elif command -v npx >/dev/null 2>&1; then
  echo "Serving ${PWD} at ${URL}"
  echo "Press Ctrl+C to stop."
  echo
  open_browser
  exec npx --yes serve -l "$PORT"
else
  echo "Could not find a local web server." >&2
  echo "Install Python 3 (https://www.python.org/downloads/) or Node.js, then run this script again." >&2
  exit 1
fi
