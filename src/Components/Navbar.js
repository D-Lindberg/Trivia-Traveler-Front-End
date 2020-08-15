import React, { Component } from 'react'
import axiosInstance from '../api/axiosApi'
import { Link } from 'react-router-dom'


export default class Navbar extends Component {
  render() {
    const loggedIn = this.props.loggedIn
    return (
      <div className="sidebar-nav">
        <nav>
          {!loggedIn &&
            <Link className="nav-link" to={"/login/"}>Login</Link>}

          {!loggedIn &&
            <Link className="nav-link" to={"/signup/"}>Signup</Link>}

          {loggedIn &&
            <Link className="nav-link" to={"/logout/"}>Logout</Link>}

          {loggedIn &&
            <Link className="nav-link" to={"/"}>Home</Link>}

          {loggedIn &&
            <Link className="nav-link" to={"/travel/"}>Travel</Link>}

          {loggedIn &&
            <Link className="nav-link" to={"/trivia/"}>Trivia</Link>}


          {loggedIn &&
            <Link className="nav-link" to={"/hello/"}>Store</Link>}

          {loggedIn &&
            <Link className="nav-link" to={"/status/"}>Status</Link>}
        </nav>
      </div>
    )
  }
}
