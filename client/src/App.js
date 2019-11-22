import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import NavBar from './components/navbar.component';
import Home from './components/home.component';
import BottomBar from './components/bottom-bar.component';
import Login from './components/login';
import withAuth from './components/withAuth';
import Admin from './components/admin.component';
import NewProject from './components/new-project.component';
import Error404 from './components/e404.component';

import 'bootstrap/dist/js/bootstrap';
import './vendor/fontawesome-free/css/all.min.css';
import './App.css';

class App extends Component {
  state = {
    pageLink: ''
  };
  render() {
    return (
      <React.Fragment>
        <NavBar></NavBar>
        <Router>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/admin" component={withAuth(Admin)} />
            <Route path="/addproject" component={withAuth(NewProject)} />
            <Route path="/editproject/:id" component={withAuth(NewProject)} />
            <Route component={Error404} />
          </Switch>
        </Router>
        <BottomBar />
      </React.Fragment>
    );
  }
}

export default App;
