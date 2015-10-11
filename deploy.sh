#!/usr/bin/env bash

set -euo pipefail

export AWS_DEFAULT_REGION=us-east-1

VERSION=circle-${CIRCLE_SHA1}-$(date +%s)
ARCHIVE=${VERSION}.zip

docker login -e $DOCKER_EMAIL -u $DOCKER_USERNAME -p $DOCKER_PASSWORD
docker build -t jeffreycharles/number-switcher-3000:${VERSION} .
docker push jeffreycharles/number-switcher-3000

cat << EOF > Dockerrun.aws.json
{
  "AWSEBDockerrunVersion": "1",
  "Image": "jeffreycharles/number-switcher-3000:${VERSION}",
  "Ports": [{ "ContainerPort": "3000" }]
}
EOF

zip $ARCHIVE Dockerrun.aws.json
aws s3 cp $ARCHIVE s3://number-switcher-3000-deployments/${ARCHIVE}
aws elasticbeanstalk create-application-version \
  --application-name number-switcher-3000 \
  --version-label $VERSION \
  --source-bundle S3Bucket='number-switcher-3000-deployments',S3Key="${ARCHIVE}"
aws elasticbeanstalk update-environment \
  --environment-name number-switcher-3000 \
  --version-label $VERSION
