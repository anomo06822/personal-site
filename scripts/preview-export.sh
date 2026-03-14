#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PREVIEW_ROOT="$ROOT_DIR/.preview"
TARGET_DIR="$PREVIEW_ROOT/personal-site"
PORT="${1:-4321}"

rm -rf "$TARGET_DIR"
mkdir -p "$TARGET_DIR"
rsync -a --delete "$ROOT_DIR/out/" "$TARGET_DIR/"

cd "$PREVIEW_ROOT"
python3 -m http.server "$PORT"
