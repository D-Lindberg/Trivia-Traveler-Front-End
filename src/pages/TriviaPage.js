import React, { Component } from 'react'
import { FormGroup, Label, Input, } from 'reactstrap'
import {TriviaContext} from '../Context/TriviaContext'
import DisplayQuestion from '../Components/DisplayQuestion'
import DisplayResults from '../Components/DisplayResults'

export default class TriviaPage extends Component {
  static contextType = TriviaContext
  constructor(props) {
    super(props)
    this.state = {refresh: false}
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  fetchTriviaQuestion = async () => {
    let response = await fetch("https://opentdb.com/api.php?amount=1&encode=base64")
    let json = await response.json()
    return json
  }

  handleSubmit(event) {
    event.preventDefault()
    const {correct_answer, updateAnswer, worth} = this.context
    let userAnswer
    let options = document.getElementById('TriviaForm').elements
    for (let i = 0; i < options.length; i++) {
      if (options[i].checked) {
        userAnswer = options[i].labels[0].textContent
        break
      }
    }
    let message
    if (userAnswer.includes(correct_answer)) {
      message = `Your answer is correct. You earned ${worth} credits.`
    } else {
      message = "That is not correct."
    }
    //update status on backend before re rendering
    updateAnswer(userAnswer.slice(1), message)

    //this.setState({userAnswered: true, messageToUser: message})

  }

  prepareQuestion = async () => {
    const {updateQuestion} = this.context
    //if (!this.context.userHasAnswered) {
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
    let worth = 0
    if (difficulty === "hard") {
      worth = 800
    } else if (difficulty === "medium") {
      worth = 400
    } else {
      worth = 100
    }
    updateQuestion(category, difficulty, question, correct_answer, wrong_answers, multiple, worth)
    //this.setState({ Trivia: { category: category, difficulty: difficulty, question: question, correct_answer: correct_answer, incorrect_answers: wrong_answers }, multiple: multiple, worth: worth })
  //} else {
    //console.log(`this is the current difficulty ${this.context.difficulty}, this is the correct answer ${this.context.correct_answer}. finally, it is worth this much: ${this.context.worth}`)
  }

  componentDidMount() {
    if (this.context.firstRender){
      this.prepareQuestion()
    }
  }

  componentDidUpdate(prevProps){
    if (this.context.firstRender && !this.context.userHasAnswered){
      this.prepareQuestion()
    }
  }

  //sorted list will work for 99% of the questions
  // perhaps check for "all of the above" or similar as it isn't consistent
  //and then move that to the last entry
  arrange_answers_for_display() {
    if (this.context.multiple === false) {
      return ['True', 'False']
    } else if (this.context.multiple === true) {
      let answer_list = this.context.incorrect_answers.slice()
      answer_list.push(this.context.correct_answer)
      return answer_list.sort()
    } else {
      return ['', '', '', '']
    }
  }

  prepareAnswersForDisplay() {
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

  render() {
    console.log(this.context)
    const {userHasAnswered} = this.context
    if (userHasAnswered) {
      return (
        <DisplayResults />
      )
    } else {
      if (!this.context.firstRender) {
        return (
          <DisplayQuestion 
          answers={this.prepareAnswersForDisplay()}
          handleSubmit={this.handleSubmit} />
        )
      } else {
        return <div>Fetching Trivia. Please Standby.</div>
      }
    }
  }
}
