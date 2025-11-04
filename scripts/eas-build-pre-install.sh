#!/usr/bin/env bash
set -euo pipefail

echo "Installing Convex CLI..."
npm install -g convex

echo "Deploying Convex..."
npx convex deploy --prod

echo "Generating Convex types..."
npx convex codegen

echo "Convex setup complete!"