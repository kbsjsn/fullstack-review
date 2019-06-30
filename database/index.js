const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', {useMongoClient: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error:'));
db.once('open', () => { console.log('DB connection successful') });

//define schema
let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  login: String,
  html_url: String,
  repoNames: []

});

//compiles schema into model
let Repo = mongoose.model('Repo', repoSchema);


//new Repo document
// let octocat = new Repo({name: 'octocat', html_url: 'http...', repoNames: [...]})

let save = ({login, html_url, repoNames}) => {
  let username = new Repo({ login, html_url, repoNames });
  username.save( (err, username) => {
    if(err) {
      return console.error(err)
    }
    console.log('Successfully saved to MongoDB', username);

  })
  // username.save()
  //   .then( () => console.log('Successfully saved to MongoDB'))
  //   .catch( err => console.error('Failed to save to MongoDB'));

  Repo.find({}, data => console.log('THIS is response from DB', data));

  //**** TO DO: save unique repos to MongoDB
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
}

module.exports.save = save;