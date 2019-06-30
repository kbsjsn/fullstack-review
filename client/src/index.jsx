import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
    this.search = this.search.bind(this);
    this.updateReposArray = this.updateReposArray.bind(this);
  }

  updateReposArray(data) {
    var copy = this.state.repos.slice();
    copy.push(data);
    this.setState({repos: copy});
  }

  search (term) {
    console.log(`${term} was searched`);
    // TODO
    axios.post('/repos', {login: term})
      .then( ({ data }) => {
        // console.log('Get request processed on client');
        var copy = [];
        copy.push(data);
        this.setState({repos: copy});
        //console.log('THIS IS RETURNED FROM SERVER', this.state.repos);
      } )
      .catch( err => console.error('Get request failed on client', err))
  }


  //cannot display obj's onto DOM, or cannot render objs in react
  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search}/>
      <RepoList repos={this.state.repos} />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));