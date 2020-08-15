import React, { Component } from "react";
import Tables from "../Components/Table"
import StatusMap from '../Components/StatusMap'

class StatusPage extends Component {
  /*
  constructor(props) {
    super(props);
  }
  */
  render() {
    return (
      <div>
        <h2>edit this in StatusPage.js</h2>
        <StatusMap />
        <h1>I love you Carrie!</h1>
        <Tables />
      </div>
    )
  }
}
export default StatusPage;