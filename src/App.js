import React, {Component} from 'react';import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';import Plans from './containers/Plans/Plans';import Team from './containers/Team/Team';import './App.css';class App extends Component {  render() {    return (      <BrowserRouter>        <div className="App">          <React.Fragment>            <Switch>              <Route path="/" exact component={Plans}/>              <Route path="/plans" component={Plans}/>              <Route path="/team" component={Team}/>              <Route render={() => <Redirect to="/"/>}/>            </Switch>          </React.Fragment>        </div>      </BrowserRouter>    );  }}export default App;