#!/usr/bin/env bash
#
# Compiles the LaTeX resume source into the PDF the site serves.
#
# Two passes are needed: the first resolves the \newcommand definitions and page
# references, the second lays out with those values known. Running once produces
# a PDF with unresolved references and wrong line breaks.
#
# Output goes to public/resume/, which is what /resume reads. The file is
# committed so the site never depends on a LaTeX toolchain at build time, which
# Vercel does not provide.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC="$ROOT/src/data/resume/main.tex"
BUILD="$ROOT/.resume-build"
OUT="$ROOT/public/resume/mehfooj-alam-resume.pdf"

# The pdf.js worker is fetched by the browser at runtime from a fixed URL, so it
# cannot stay in node_modules. It is committed to public/ and refreshed from the
# installed package when node_modules is present, which keeps it in step with the
# pdfjs-dist version the site actually loads.
#
# The refresh is best effort on purpose. CI checks out a bare tree with no
# install, and the committed worker is already correct there; failing the build
# over a copy that is not needed would break the pipeline for no gain.
WORKER_SRC="$ROOT/node_modules/pdfjs-dist/build/pdf.worker.min.mjs"
WORKER_OUT="$ROOT/public/pdf.worker.min.mjs"

copy_worker() {
  if [[ ! -f "$WORKER_SRC" ]]; then
    echo "skipping worker refresh: node_modules absent, using the committed copy"
    return 0
  fi
  if [[ ! -f "$WORKER_OUT" ]] || ! cmp -s "$WORKER_SRC" "$WORKER_OUT"; then
    cp "$WORKER_SRC" "$WORKER_OUT"
    echo "refreshed public/pdf.worker.min.mjs from the installed pdfjs-dist"
  fi
}

mkdir -p "$BUILD" "$(dirname "$OUT")"

# The worker is refreshed unconditionally and before the LaTeX check, so it stays
# in sync even on a machine with no TeX installed, and even in CI when the
# compile step is skipped because nothing changed.
copy_worker

if ! command -v pdflatex >/dev/null 2>&1; then
  echo "error: pdflatex not found." >&2
  echo "  Debian/Ubuntu: apt-get install texlive-latex-recommended texlive-fonts-recommended" >&2
  echo "  macOS:         brew install --cask mactex" >&2
  exit 1
fi

# -interaction=nonstopmode so a missing package does not hang waiting for input.
# -halt-on-error so a real failure stops instead of shipping a broken PDF.
#
# The log is captured rather than discarded. A silent failure here is close to
# impossible to diagnose from a CI run, because the only output is an exit code.
compile() {
  local log="$BUILD/pdflatex.log"
  if ! pdflatex -interaction=nonstopmode -halt-on-error \
       -output-directory="$BUILD" "$SRC" >"$log" 2>&1; then
    echo "pdflatex failed. Last lines of the log:" >&2
    tail -25 "$log" >&2
    exit 1
  fi
}

compile
compile

BUILT="$BUILD/main.pdf"
if [[ ! -f "$BUILT" ]]; then
  echo "error: pdflatex produced no PDF. Re-run without >/dev/null to see the log." >&2
  exit 1
fi

cp "$BUILT" "$OUT"
rm -rf "$BUILD"

PAGES=$(grep -c "/Type[[:space:]]*/Page[^s]" "$OUT" 2>/dev/null || echo "?")
echo "built $OUT ($(wc -c <"$OUT") bytes, $PAGES pages)"