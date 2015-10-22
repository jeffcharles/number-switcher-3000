#!/usr/bin/env bash

set -euo pipefail

analyze-bundle-size <(webpack --json)
