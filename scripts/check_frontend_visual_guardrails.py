from __future__ import annotations

import re
import sys
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
TARGET_DIR_CANDIDATES = [
    REPO_ROOT / "src",
    REPO_ROOT / "app",
    REPO_ROOT / "frontend" / "src",
]

INLINE_STYLE_RE = re.compile(r"<[^>]+\sstyle\s*=\s*[\"']", re.IGNORECASE)
SCOPED_STYLE_RE = re.compile(r"<style\b[^>]*\bscoped\b", re.IGNORECASE)
LOCAL_STYLE_BLOCK_RE = re.compile(r"<style\b(?![^>]*\bscoped\b)[^>]*>(.*?)</style>", re.IGNORECASE | re.DOTALL)
HARDCODED_LAYOUT_RE = re.compile(
    r"\b(?:margin|padding|gap|row-gap|column-gap|max-width|min-width|width|border-radius)\s*:\s*[^;]*(?:px|rem)\b",
    re.IGNORECASE,
)


def iter_source_files() -> list[Path]:
    files: list[Path] = []
    for base_dir in TARGET_DIR_CANDIDATES:
        if base_dir.exists():
            files.extend(path for path in base_dir.rglob("*") if path.is_file())
    return files


def relative_path(path: Path) -> str:
    return path.relative_to(REPO_ROOT).as_posix()


def main() -> int:
    errors: list[str] = []
    files = iter_source_files()

    if not files:
        print("Frontend visual guardrails: skipped (no frontend source directories found)")
        return 0

    for path in files:
        if path.suffix not in {".vue", ".css"}:
            continue

        rel = relative_path(path)
        text = path.read_text(encoding="utf-8")

        if path.suffix == ".vue":
            if INLINE_STYLE_RE.search(text):
                errors.append(f"{rel}: inline style= is not allowed.")

            if SCOPED_STYLE_RE.search(text):
                errors.append(f"{rel}: <style scoped> detected. Prefer shared styles.")

            for block in LOCAL_STYLE_BLOCK_RE.findall(text):
                if HARDCODED_LAYOUT_RE.search(block):
                    errors.append(f"{rel}: local hardcoded layout values detected.")
                    break

        if path.suffix == ".css" and HARDCODED_LAYOUT_RE.search(text):
            errors.append(f"{rel}: hardcoded layout values detected in stylesheet.")

    if errors:
        sys.stderr.write("Frontend visual guardrails failed.\n")
        sys.stderr.write("Review docs/frontend/frontend-visual-guide.md and docs/frontend/frontend-visual-contract.md.\n\n")
        for error in errors:
            sys.stderr.write(f"- {error}\n")
        return 1

    print("Frontend visual guardrails: OK")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
