# Let Me In

[![Circle CI](https://circleci.com/gh/jeffcharles/number-switcher-3000.svg?style=shield)](https://circleci.com/gh/jeffcharles/number-switcher-3000)

A project for setting up number forwarding for an apartment buzzer

## Running the site

1. Setup AWS credentials
2. Set environment variables for values in `api/conf.js`
2. `npm install --production`
3. `npm start`

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
