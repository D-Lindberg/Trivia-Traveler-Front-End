import React, { Component } from "react";
import axiosInstance from '../api/axiosApi'
import { Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap'

class SignupPage extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", email: "", error: {} };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await axiosInstance.post('/user/create/', {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      });
      return response;
    } catch (error) {
      console.log(error)
      console.log(error.stack);
      console.log(error.message);
      if (error.response) {
        this.setState({ error: error.response.data })
      } else if (error.request) {
        console.log("Request made but no response received")
        console.log(error.request)
        this.setState({ error: error.request })
      } else {
        console.log("something else happend and no request was made.")
        console.log(error.message)
        this.setState({ error: error.message })
      }
    }
  }

  render() {
    return (
      <div>
        <Form className="login-form" onSubmit={this.handleSubmit}>
          <h2 className="text-center">Signup</h2>
          <FormGroup style={{ margin: '3em' }}>
            <Label className="text-center " >Username:</Label>
            <Input name="username" type="text" value={this.state.username} onChange={this.handleChange} />
            {this.state.error.username ? this.state.error.username : null}
            <Label >E-mail:</Label>
            <Input name="email" type="email" value={this.state.email} onChange={this.handleChange} />
            {this.state.error.email ? this.state.error.email : null}
            <Label >Password:</Label>
            <Input name="password" type="password" value={this.state.password} onChange={this.handleChange} />
            {this.state.error.password ? this.state.error.password : null}
            <Button style={{marginTop:"1em"}} className="btn-lg btn-dark btn-block" onClick={this.handleSubmit}>Register</Button>
          </FormGroup>
        </Form>
        <h2>edit this in SignupPage.js</h2>
      </div>
    )
  }
}
export default SignupPage;