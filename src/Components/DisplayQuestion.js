import React, { Component } from 'react'
import {TriviaContext} from '../Context/TriviaContext'
import {Form, FormGroup, Col, Button} from 'reactstrap'


export default class DisplayQuestion extends Component {
  static contextType = TriviaContext
  render() {
    const {category, difficulty, question} = this.context
    const {handleSubmit, answers} = this.props
    return (
      <div style={{ display: 'block' }}>
            <Form onSubmit={handleSubmit}>
              <FormGroup id="TriviaForm" tag="fieldset" style={{ display: 'inline-block', margin: "auto" }} >
                <legend>{category}</legend>
                <p>Difficulty: {difficulty}</p>
                <p>{question}</p>
                <Col sm={10} style={{ textAlign: "left" }}>
                  {answers}
                </Col>
                <Button type="submit" >Submit</Button>
              </FormGroup>
            </Form>
          </div>
    )
  }
}
