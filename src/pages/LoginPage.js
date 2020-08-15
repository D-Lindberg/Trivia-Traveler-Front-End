import React, { Component } from "react";
import axiosInstance from '../api/axiosApi'
import { Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap'
import { withRouter } from 'react-router-dom'

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmitWAsyncAwait = this.handleSubmitWAsyncAwait.bind(this)
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  async handleSubmitWAsyncAwait(event) {
    event.preventDefault();
    let currentUser = this.state.username
    try {
      const response = await axiosInstance.post('/token/obtain/', {
        username: currentUser,
        password: this.state.password
      });
      axiosInstance.defaults.headers['Authorization'] = "JWT " + response.data.access;
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      localStorage.setItem('username', currentUser)
      this.props.updateLoginState()
      this.props.history.push("/")
      return response;
    } catch (error) {
      throw error;
    }
  }

  render() {
    return (
      <Form className="login-form" onSubmit={this.handleSubmitWAsyncAwait}>
        <h2 className="text-center">Welcome!</h2>
        <h1 className="font-weight-bold">Trivia-Traveler.</h1>
        <FormGroup style={{margin:'3em'}}>
          <Label>Username:</Label>
          <Input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
          <Label>Password:</Label>
          <Input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
          <Button style={{ marginTop:"1em"}}className="btn-lg btn-dark btn-block" onClick={this.handleSubmitWAsyncAwait}>Log in</Button>
        </FormGroup>
        <h2>edit this in LoginPage.js</h2>
      </Form>
    )
  }
}
export default withRouter(LoginPage);


