import React, { Component } from 'react'
import { TriviaContext } from '../Context/TriviaContext'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
export default class DisplayResults extends Component {
  render() {
    return (
      <TriviaContext.Consumer>{(context) => {
        const {messageToUser, resetTrivia} = context
        return (
          <Modal isOpen="true" style={{margin: 'auto'}}>
            <ModalHeader>Results</ModalHeader>
            <ModalBody>{messageToUser}</ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={resetTrivia}>Continue</Button>
              <Button color="secondary" >View Flights</Button>
            </ModalFooter>
          </Modal>
        )
      }}
      </TriviaContext.Consumer>
    )
  }
}
