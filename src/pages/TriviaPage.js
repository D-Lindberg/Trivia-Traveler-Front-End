import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, Button, } from 'reactstrap'

export default class TriviaPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      Trivia: {category: '', difficulty: '', question: '', correct_answer: '', incorrect_answers: ['','','','']},
      multiple: null
    }
  }

  fetchTriviaQuestion = async () => {
    console.log("about to fetch");
    let response = await fetch("https://opentdb.com/api.php?amount=1&encode=base64")
    console.log(response)
    let json = await response.json()
    console.log(json);
    return json
  }

  prepareQuestion = async () => {
    console.log("about to send to the fetcher");
    let encodedTrivia = await this.fetchTriviaQuestion()
    console.log(encodedTrivia);
    let category = atob(encodedTrivia.results[0].category)
    let type = atob(encodedTrivia.results[0].type)
    let difficulty = atob(encodedTrivia.results[0].difficulty)
    let question = atob(encodedTrivia.results[0].question)
    let correct_answer = atob(encodedTrivia.results[0].correct_answer)
    console.log(correct_answer);
    let incorrect_answers = encodedTrivia.results[0].incorrect_answers
    console.log(incorrect_answers)
    let wrong_answers = incorrect_answers.map(answer => atob(answer))
    console.log(wrong_answers)
    let multiple = type === "multiple"
    this.setState({ Trivia: { category: category, difficulty: difficulty, question: question, correct_answer: correct_answer, incorrect_answers: wrong_answers }, multiple: multiple })
  }

  componentDidMount() {
    console.log("component mounted")
    this.prepareQuestion()
  }

  //if not true or false. randomize answers.
  prepare_answers_for_display() {
    if (this.state.multiple === false) {
      return ['True', 'False']
    } else {
      let answer_list = [...this.state.incorrect_answers]
      answer_list.push(this.state.correct_answer)
      let currentIndex, temp, randomIndex
      currentIndex = answer_list.length
      while (currentIndex !== 0){
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1
        temp = answer_list[currentIndex]
        answer_list[currentIndex] = answer_list[randomIndex]
        answer_list[randomIndex] = temp
      }
      return answer_list
    }
  }

  //display the question
  //onsubmit verify the answer
  //update user currency 
  //display options to get another question
  //rerender the form if yes
  //redirect to home if no
  render() {
    if (this.state.Trivia) {
      return (
        <Form tag="fieldset">
          <legend>{this.state.Trivia.category}</legend>
          <p>{this.state.Trivia.difficulty}</p>
          <p>{this.state.Trivia.question}</p>
          <FormGroup check>
            <Label check>
              <Input type="radio" name="answer1" />{' '}
              {this.state.Trivia.correct_answer}
            </Label>
          </FormGroup>

          <FormGroup check>
            <Label check>
              <Input type="radio" name="answer1" />{' '}
              {this.state.Trivia.incorrect_answers[0]}
            </Label>
          </FormGroup>

          {this.state.multiple &&
            <FormGroup check>
              <Label check>
                <Input type="radio" name="answer1" />{' '}
                {this.state.Trivia.incorrect_answers[1]}
              </Label>
            </FormGroup>
          }
          {this.state.multiple &&
            <FormGroup check>
              <Label check>
                <Input type="radio" name="answer1" />{' '}
                {this.state.Trivia.incorrect_answers[2]}
              </Label>
            </FormGroup>
          }

          <Button>Submit</Button>
        </Form>
      )
    } else {
      return <di></di>
    }
  }
}
