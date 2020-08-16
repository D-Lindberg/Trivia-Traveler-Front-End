import React, {Component, createContext} from 'react'

export const TriviaContext = createContext()

export default class TriviaContextProvider extends Component {
  state ={
    firstRender: true,
    category: '', 
    difficulty: '', 
    question: '',
    correct_answer: '',
    incorrect_answers:['', '', '', ''], 
    multiple: null, 
    worth: 0, 
    userHasAnswered: false, 
    usersAnswer: '',
    messageToUser: 'Testing Context' 
  }

  resetTrivia=()=> {
    this.setState({
    firstRender: true,
    category: '', 
    difficulty: '', 
    question: '',
    correct_answer: '',
    incorrect_answers:['', '', '', ''], 
    multiple: null, 
    worth: 0, 
    userHasAnswered: false, 
    usersAnswer: '',
    messageToUser: 'Testing Context'})
  }

  updateQuestion=(category, difficulty, question, correct_answer, incorrect_answers, multiple, worth) => {
    this.setState({
      firstRender: false,
      category: category, 
      difficulty: difficulty, 
      question: question, 
      correct_answer: correct_answer, 
      incorrect_answers: incorrect_answers, 
      multiple: multiple, 
      worth: worth
    })
  }

  updateAnswer=(usersAnswer, messageToUser)=>{
    this.setState({
      userHasAnswered:true, 
      usersAnswer: usersAnswer, 
      messageToUser: messageToUser
    })
  }

  render() {
    return (
      <TriviaContext.Provider 
        value={{...this.state, 
        resetTrivia: this.resetTrivia, 
        updateQuestion: this.updateQuestion, 
        updateAnswer: this.updateAnswer
        }}>
        {this.props.children}
      </TriviaContext.Provider>
    )
  }
}
