'use strict';
import AWS from 'aws-sdk';
import xml2js from 'xml2js';
import conf from './conf';

export function getActions(req) {
  return req.authenticated ? ['logout', 'phonenumbers'] : ['login'];
}

export const s3 = new AWS.S3();

export function getNumbers() {
  return new Promise((resolve, reject) => {
    s3.getObject({
      Bucket: conf.aws_s3_bucket,
      Key: 'number.xml'
    }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  }).then(data => new Promise((resolve, reject) => {
    xml2js.parseString(data.Body, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  })).then(result => {
    const number = result.Response && (
      (result.Response.Dial && result.Response.Dial[0]) ||
      (result.Response.Play && 'auto-dial-in')
    );
    return [{
      name: 'Jeff',
      number: conf.jeffs_number,
      active: number === conf.jeffs_number
    }, {
      name: 'Brennen',
      number: conf.brennens_number,
      active: number === conf.brennens_number
    }, {
      name: 'Auto Dial-in',
      number: 'auto-dial-in',
      active: number === 'auto-dial-in'
    }];
  });
}
