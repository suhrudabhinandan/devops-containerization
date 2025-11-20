#!/usr/bin/env sh
DB_HOST=${DB_HOST:-mysql}
DB_PORT=${DB_PORT:-3306}
RETRY_INTERVAL=${RETRY_INTERVAL:-1}
TIMEOUT=${TIMEOUT:-60}

echo "Waiting for MySQL at ${DB_HOST}:${DB_PORT} (timeout ${TIMEOUT}s)..."

elapsed=0
while ! nc -z "$DB_HOST" "$DB_PORT"; do
  sleep $RETRY_INTERVAL
  elapsed=$((elapsed + RETRY_INTERVAL))
  echo "Still waiting... (${elapsed}s)"
  if [ "$elapsed" -ge "$TIMEOUT" ]; then
    echo "Timed out waiting for MySQL at ${DB_HOST}:${DB_PORT}"
    exit 1
  fi
done

echo "MySQL is reachable. Starting app..."
exec "$@"
