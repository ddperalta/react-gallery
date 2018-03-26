import React, { Component } from 'react';
import {
  Route,
  HashRouter
} from 'react-router-dom';
import Home from "./pages/Home";
import Add from "./pages/Add";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="App">
          <div className="content">
            <Route exact path="/" component={Home} name="home"/>
            <Route path="/add" component={Add} name="add"/>
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;
