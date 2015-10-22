#!/usr/bin/env bash

set -euo

analyze-bundle-size <(webpack --json)
