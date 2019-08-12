/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/




var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

var axios = require('axios')

// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

axios.defaults.headers = {
  'Content-Type': 'application/json',
  accept: 'application/json',
  appid: process.env.COMET_APP_ID,
  apikey: process.env.COMET_API_KEY
};

axios.defaults.baseURL = 'https://api.cometchat.com/v1.8'

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});


app.get('/token', function(req, res) {
  axios.get(`users/${req.query.uid}/auth_tokens`)
    .then(response => res.json({
      success: 'token fetched successfully',
      data: response.data.data
    }))
    .catch(error => res.status(443).json({ error }))
});

app.post('/token', function(req, res) {
  axios.post(`users/${req.body.uid}/auth_tokens`)
    .then(response => res.json({
      sucess: 'token created succesfully',
      data: response.data.data
    }))
    .catch(error => res.status(443).json({ error }))
});

app.post('/register', function(req, res) {
  const { uid, age, fullName, email } = req.body;
  axios.post('users', {
    uid,
    email,
    name: fullName,
    metadata: { age }
  }).then(response => res.json({
    success: 'account created',
    data: response.data.data
  })).catch(error => res.status(443).json({ error }))
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
