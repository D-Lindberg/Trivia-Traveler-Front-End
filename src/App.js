import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import HomePage from './pages/HomePage'
import Hello from './pages/hello'
import TravelPage from './pages/TravelPage'
import StatusPage from './pages/StatusPage'
import Navbar from './Components/Navbar';
import LogoutPage from './pages/LogoutPage'
import TriviaPage from './pages/TriviaPage'






class App extends Component {
  state = {
    userLoggedIn: false
  }

  componentDidMount() {
    // call axios login/refresh api
  }




  toggleLogin = () => { this.setState({ userLoggedIn: !this.state.userLoggedIn }) }


  render() {
    return (
      <Router>
        <div className="App">
          <div style={{ display: 'flex' }}>
            <Navbar loggedIn={this.state.userLoggedIn}></Navbar>
            <div className="page-content-wrapper">
              <div className="container-fluid">
                <header className="App-header">
                  <h6>Edit this in App.js</h6>
                  <p>{`a place to show currency or other state. loggedIn = ${this.state.userLoggedIn}`}</p>
                </header>
                <main className="main-content">
                  <Switch>
                    <Route exact path={"/login"}>
                      <LoginPage updateLoginState={this.toggleLogin} />
                    </Route>
                    <Route exact path={"/logout"}>
                      <LogoutPage updateLoginState={this.toggleLogin} />
                    </Route>
                    <Route exact path={"/signup"}>
                      <SignupPage updateLoginState={this.toggleLogin} />
                    </Route>
                    <Route exact path={"/hello"} component={Hello} />
                    <Route exact path={"/travel"}>
                      <TravelPage username={localStorage.getItem('username')} />
                    </Route>
                    <Route exact path={"/trivia"}>
                      <TriviaPage username={localStorage.getItem('username')} />
                    </Route>
                    <Route exact path={"/status"}>
                      <StatusPage username={localStorage.getItem('username')} />
                    </Route>
                    <Route path={"/"} component={HomePage} />
                  </Switch>
                  <button onClick={this.toggleLogin}>Toggle Login and logout and remove from App.js Render</button>
                </main>
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
