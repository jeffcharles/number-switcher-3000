'use strict';
import AWS from 'aws-sdk';
import Immutable from 'immutable';
import xml2js from 'xml2js';
import conf from './conf';

export function getActions(req) {
  return Immutable.fromJS(
    req.authenticated ? ['logout', 'phonenumbers'] : ['login']
  );
}

export const s3 = new AWS.S3();

export function getNumbers() {
  return new Promise((resolve, reject) => {
    s3.getObject({
      Bucket: conf.get('aws_s3_bucket'),
      Key: 'number.xml'
    }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  }).then(data => new Promise((resolve, reject) => {
    xml2js.parseString(data.Body, { explictRoot: true }, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  })).then(result => {
    const number =
      result.Response && result.Response.Dial && result.Response.Dial[0];
    return Immutable.fromJS([{
      name: 'Jeff',
      number: conf.get('jeffs_number'),
      active: number === conf.get('jeffs_number')
    }, {
      name: 'Brennen',
      number: conf.get('brennens_number'),
      active: number === conf.get('brennens_number')
    }]);
  });
}
