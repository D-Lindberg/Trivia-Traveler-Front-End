import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axiosInstance from '../api/axiosApi'

export default withRouter(class LogoutPage extends Component {
  async handleLogout() {
    try {
      const response = await axiosInstance.post('/blacklist/', {
        "refresh_token": localStorage.getItem("refresh_token")
      });
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('username')
      axiosInstance.defaults.headers['Authorization'] = null;
      this.props.updateLoginState();
      this.props.history.push("/home");
      return response;
    }
    catch (e) {
      console.log(e);
    }
  }
  
  componentDidMount() {
    this.handleLogout()
  }
  
  render() {
    return (
      <div>
        <h1>Did you See this?</h1>
      </div>
    )
  }
}
)