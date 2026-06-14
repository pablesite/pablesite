#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

step() {
  printf '\n[%s] %s\n' "$1" "$2"
}

run() {
  local label="$1"
  shift
  step RUN "$label"
  "$@"
}

has_npm_script() {
  local package_json="$1"
  local script_name="$2"

  [[ -f "$package_json" ]] || return 1

  python3 - "$package_json" "$script_name" <<'PY'
import json
import sys

package_json, script_name = sys.argv[1], sys.argv[2]
with open(package_json, encoding="utf-8") as fh:
    data = json.load(fh)
sys.exit(0 if script_name in data.get("scripts", {}) else 1)
PY
}

run_npm_checks_in_dir() {
  local dir="$1"
  local package_json="$dir/package.json"

  [[ -f "$package_json" ]] || return 0

  step CHECK "npm validations in ${dir#"$ROOT_DIR"/}"

  if has_npm_script "$package_json" "lint"; then
    run "${dir#"$ROOT_DIR"/} npm run lint" npm --prefix "$dir" run lint
  fi

  if has_npm_script "$package_json" "format:check"; then
    run "${dir#"$ROOT_DIR"/} npm run format:check" npm --prefix "$dir" run format:check
  fi

  if has_npm_script "$package_json" "typecheck"; then
    run "${dir#"$ROOT_DIR"/} npm run typecheck" npm --prefix "$dir" run typecheck
  fi

  if has_npm_script "$package_json" "test"; then
    run "${dir#"$ROOT_DIR"/} npm test" npm --prefix "$dir" test -- --runInBand
  elif has_npm_script "$package_json" "test:unit"; then
    run "${dir#"$ROOT_DIR"/} npm run test:unit" npm --prefix "$dir" run test:unit
  fi
}

main() {
  cd "$ROOT_DIR"

  step CHECK "Frontend visual guardrails"
  python3 scripts/check_frontend_visual_guardrails.py

  if [[ -f pyproject.toml ]]; then
    if command -v ruff >/dev/null 2>&1; then
      run "ruff check" ruff check .
      run "ruff format --check" ruff format --check .
    else
      step WARN "pyproject.toml detected but ruff is not installed; skipping Python lint"
    fi

    if command -v mypy >/dev/null 2>&1; then
      run "mypy" mypy .
    else
      step INFO "mypy not installed; skipping type check"
    fi

    if command -v pytest >/dev/null 2>&1 && [[ -d tests ]]; then
      run "pytest" pytest
    else
      step INFO "pytest not available or tests/ missing; skipping Python tests"
    fi
  fi

  run_npm_checks_in_dir "$ROOT_DIR"
  run_npm_checks_in_dir "$ROOT_DIR/frontend"
  run_npm_checks_in_dir "$ROOT_DIR/app"
  run_npm_checks_in_dir "$ROOT_DIR/web"

  step OK "Validation completed"
}

main "$@"
