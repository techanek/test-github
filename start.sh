#!/bin/sh
set -e

# Start main app in background
node main.js &

# Start sidecar in foreground
node app.js
