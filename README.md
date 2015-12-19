# number-switcher-3000

[![Circle CI](https://circleci.com/gh/jeffcharles/number-switcher-3000.svg?style=shield)](https://circleci.com/gh/jeffcharles/number-switcher-3000)

A project for setting up number forwarding for an apartment buzzer

## Running the site

1. Setup AWS credentials
2. Set environment variables for values in `api/conf.js`
3. `npm install --production`
4. `npm start`

## Dev requirements

- nvm

## Running the dev site

1. Setup AWS credentials
2. Consider setting environment variables for values in `api/conf.js`
3. `npm install`
4. `npm run watch` to run the dev site
5. `npm test` to run the continuous integration tests

## AWS IAM policy template

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:GetObject",
                "s3:PutObject",
                "s3:PutObjectAcl"
            ],
            "Resource": "arn:aws:s3:::<aws_s3_bucket>/number.xml"
        }
    ]
}
```

## CI AWS IAM template

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:GetObject",
                "s3:PutObject",
                "s3:PutObjectAcl"
            ],
            "Resource": "arn:aws:s3:::number-switcher-3000-dev/number.xml"
        },
        {
            "Effect": "Allow",
            "Action": "s3:ListBucket",
            "Resource": "arn:aws:s3:::number-switcher-3000-deployments"
        },
        {
            "Effect": "Allow",
            "Action": [
                "s3:GetObject",
                "s3:PutObject",
                "s3:PutObjectAcl"
            ],
            "Resource": "arn:aws:s3:::number-switcher-3000-deployments/*"
        },
        {
            "Effect": "Allow",
            "Action": "elasticbeanstalk:CreateApplicationVersion",
            "Resource": "arn:aws:elasticbeanstalk:us-east-1:762636538502:applicationversion/number-switcher-3000/*"
        },
        {
            "Effect": "Allow",
            "Action": "elasticbeanstalk:UpdateEnvironment",
            "Resource": "arn:aws:elasticbeanstalk:us-east-1:762636538502:environment/number-switcher-3000/number-switcher-3000"
        },
        {
            "Effect": "Allow",
            "Action": [
                "cloudformation:CancelUpdateStack",
                "cloudformation:GetTemplate",
                "cloudformation:DescribeStackEvents",
                "cloudformation:DescribeStackResource",
                "cloudformation:DescribeStackResources",
                "cloudformation:DescribeStacks",
                "cloudformation:UpdateStack"
            ],
            "Resource": "arn:aws:cloudformation:us-east-1:762636538502:stack/*"
        },
        {
            "Effect": "Allow",
            "Action": "s3:*",
            "Resource": [
                "arn:aws:s3:::elasticbeanstalk*",
                "arn:aws:s3:::elasticbeanstalk*/*"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "ec2:DescribeAddresses",
                "ec2:DescribeKeyPairs",
                "ec2:DescribeImages",
                "ec2:DescribeInstances",
                "ec2:DescribeSecurityGroups",
                "ec2:DescribeSubnets",
                "ec2:DescribeVpcs"
            ],
            "Resource": "*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "SNS:CreateTopic",
                "SNS:GetTopicAttributes",
                "SNS:ListSubscriptionsByTopic"
            ],
            "Resource": "arn:aws:sns:us-east-1:762636538502:ElasticBeanstalkNotifications-Environment-number-switcher-3000"
        },
        {
            "Effect": "Allow",
            "Action": [
                "autoscaling:DescribeAutoScalingGroups",
                "autoscaling:DescribeLaunchConfigurations",
                "autoscaling:DescribeScalingActivities",
                "autoscaling:ResumeProcesses",
                "autoscaling:SuspendProcesses"
            ],
            "Resource": "*"
        }
    ]
}
```
