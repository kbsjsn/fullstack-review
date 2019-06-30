const request = require('request');
const config = require('../config.js');

let getReposByUsername = (login, callback) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    url: `https://api.github.com/users/${login}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  request(options, (err, res, body) => {
    if (err) {
      return console.error('Request to Git API failed', err)
    }
    // console.log('RESPONSE', res.body);
    // console.log("BODY", body);
    callback(null, res, body);
  });

}

module.exports.getReposByUsername = getReposByUsername;