#!/usr/bin/env bash

set -euo pipefail

export AWS_DEFAULT_REGION=us-east-1

VERSION=circle-${CIRCLE_SHA1}-$(date +%s)
FILE=${VERSION}-Dockerrun.aws.json

docker login -e $DOCKER_EMAIL -u $DOCKER_USERNAME -p $DOCKER_PASSWORD
docker build -t jeffreycharles/number-switcher-3000:${VERSION} .
docker push jeffreycharles/number-switcher-3000

cat << EOF > Dockerrun.aws.json
{
  "AWSEBDockerrunVersion": "1",
  "Image": "jeffreycharles/number-switcher-3000:${VERSION}",
  "Ports": 3000
}
EOF

aws s3 cp Dockerrun.aws.json s3://number-switcher-3000-deployments/${FILE}
aws elasticbeanstalk create-application-version \
  --application-name number-switcher-3000 \
  --version-label $VERSION \
  --source-bundle S3Bucket='number-switcher-3000-deployments',S3Key="${FILE}"
aws elasticbeanstalk update-environment \
  --environment-name number-switcher-3000 \
  --version-label $VERSION
