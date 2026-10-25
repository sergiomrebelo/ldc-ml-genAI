#!/usr/bin/env bash
set -euo pipefail

# Run this script from any directory; all paths are resolved relative to it.
cd "$(dirname "${BASH_SOURCE[0]}")"

if ! command -v python3 >/dev/null 2>&1; then
  echo "Error: python3 is required. Install Python 3 and try again." >&2
  exit 1
fi

if [[ ! -d .venv ]]; then
  python3 -m venv .venv
fi

# shellcheck disable=SC1091
source .venv/bin/activate

# TensorFlow Hub currently imports pkg_resources; setuptools 82 removed it.
python -m pip install --upgrade pip
python -m pip install "setuptools<82" flask pillow tensorflow tensorflow-hub numpy

if [[ ! -f data/example.jpg ]]; then
  echo "Error: data/example.jpg was not found in $(pwd)." >&2
  echo "Add an image at data/example.jpg, then run this script again." >&2
  exit 1
fi

python classifier_service.py data/example.jpg
