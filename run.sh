#!/bin/bash
set -euo pipefail

tests_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
project_dir="$(pwd)"

echo "УСТАНОВКА ЗАВИСИМОСТЕЙ"
# Project lock files may be incomplete; let npm repair the CI working copy.
npm install --no-audit --no-fund
npm ci --prefix "$tests_dir" --no-audit --no-fund
(cd "$tests_dir" && npx --no-install playwright install --with-deps chromium)

echo "СБОРКА ПРОЕКТА"
npm run build

echo "ЗАПУСК ПРОЕКТА И ТЕСТОВ"
cd "$tests_dir"
PROJECT_DIR="$project_dir" npm run test
