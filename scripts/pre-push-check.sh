#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

step() {
  printf '\n[%s] %s\n' "$1" "$2"
}

main() {
  cd "$ROOT_DIR"

  step CHECK "Git working tree snapshot"
  git status -sb

  step CHECK "Local validation gate"
  ./scripts/validate.sh

  if command -v gitleaks >/dev/null 2>&1; then
    step CHECK "Secret scan"
    gitleaks detect --source . --no-git --redact
  else
    step INFO "gitleaks not installed; skipping secret scan"
  fi

  step OK "Pre-push checks passed"
}

main "$@"
