const express = require('express');
let getReposByUsername = require('../helpers/github.js').getReposByUsername;
const saveToDb = require('../database/index.js').save;
let app = express();
let parser = require('body-parser');


app.use(parser.json());
app.use(parser.urlencoded({extended: true}))
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  let { login } = req.body;
  let repos;
  getReposByUsername(login, (err, data, body) => {
    if (err) {
      console.error(err);
      res.status(404).send('Post request failed', err);
    }
    repos = JSON.parse(body);
    // console.log('THIS SHOULD BE RESP FROM GIT', repos);
    let dataToDb = {
      login: repos[0].owner.login,
      html_url: repos[0].html_url,
      repoNames: repos.map(obj => obj.name)
    };
    // console.log('THIS IS DATA FOR DB', dataToDb)
    saveToDb(dataToDb);
    res.status(201).send(dataToDb);
    });


  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

