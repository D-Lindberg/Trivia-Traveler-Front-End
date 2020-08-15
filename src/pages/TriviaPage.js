import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, Button, Col } from 'reactstrap'

export default class TriviaPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      Trivia: {category: '', difficulty: '', question: '', correct_answer: '', incorrect_answers: ['','','','']},
      multiple: null
    }
  }

  fetchTriviaQuestion = async () => {
    let response = await fetch("https://opentdb.com/api.php?amount=1&encode=base64")
    let json = await response.json()
    console.log(json);
    return json
  }

  prepareQuestion = async () => {
    let encodedTrivia = await this.fetchTriviaQuestion()
    let category = atob(encodedTrivia.results[0].category)
    let type = atob(encodedTrivia.results[0].type)
    let difficulty = atob(encodedTrivia.results[0].difficulty)
    let question = atob(encodedTrivia.results[0].question)
    let correct_answer = atob(encodedTrivia.results[0].correct_answer)
    console.log(correct_answer);
    let incorrect_answers = encodedTrivia.results[0].incorrect_answers
    let wrong_answers = incorrect_answers.map(answer => atob(answer))
    let multiple = type === "multiple"
    this.setState({ Trivia: { category: category, difficulty: difficulty, question: question, correct_answer: correct_answer, incorrect_answers: wrong_answers }, multiple: multiple })
  }

  componentDidMount() {
    this.prepareQuestion()
  }

  //sorted list will work for 99% of the questions
  // perhaps check for "all of the above" or similar as it isn't consistent
  //and then move that to the last entry
  arrange_answers_for_display() {
    if (this.state.multiple === false) {
      return ['True', 'False']
    } else if (this.state.multiple === true) {
      let answer_list = this.state.Trivia.incorrect_answers.slice()
      answer_list.push(this.state.Trivia.correct_answer)
      return answer_list.sort()
    } else {
      return ['','','','']
    }
  }

  prepareAnswersForDisplay () {
    let answerSequence = this.arrange_answers_for_display()
    let toBeDisplayed = answerSequence.map((answer, index) => {
      return (
        <FormGroup check key={index}>
          <Label check>
            <Input type="radio" name="answer" />
              {' '}{answer}
          </Label>
        </FormGroup>)
    })
    return toBeDisplayed
  }

  //onsubmit verify the answer
  //update user currency 
  //display options to get another question
  //rerender the form if yes
  //redirect to home if no
  render() {
    if (this.state.Trivia) {
      return (
        <div style={{display: 'block'}}>
        <Form tag="fieldset" style={{display: 'inline-block', margin:"auto"}}>
          <legend>{this.state.Trivia.category}</legend>
          <p>Difficulty: {this.state.Trivia.difficulty}</p>
          <p>{this.state.Trivia.question}</p>
          <Col sm={10} style={{textAlign:"left"}}>
          {this.prepareAnswersForDisplay()}
          </Col>
          <Button>Submit</Button>
        </Form>
        </div>
      )
    } else {
      return <div></div>
    }
  }
}
