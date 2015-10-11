#!/usr/bin/env bash

set -euo pipefail

VERSION=circle-${CIRCLE_SHA1}-$(date +%s)
ARCHIVE=${VERSION}.zip

pip install awscli
git archive HEAD --format=zip > $ARCHIVE
aws s3 cp $ARCHIVE s3://number-switcher-3000-deployments/${ARCHIVE}
aws elasticbeanstalk create-application-version \
  --application-name number-switcher-3000 \
  --version-label $VERSION \
  --source-bundle S3Bucket='number-switcher-3000-deployments',S3Key="${ARCHIVE}"
aws elasticbeanstalk update-environment \
  --environment-name number-switcher-3000 \
  --version-label $VERSION
