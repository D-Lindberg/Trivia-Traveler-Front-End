import React, { Component } from "react";
import Tables from "../Components/Table"
import MappingHistory from '../Components/Map'


class HomePage extends Component {
  /*
  constructor(props) {
    super(props);
  }
  */
  render() {
    return (
      <div style={{width: '100%', paddingLeft:"2%"}}>
        <h1 style={{fontSize:'4em'}}>Welcome to Trivia Traveler!</h1>
        <p style={{fontSize:'2.4em'}}>Your goal is travel to 24 different Time Zones around the world!</p>
        <p>Selecting the <span style={{fontSize:'1.4em'}}>"Travel"</span> navigation link allows you to purchase flights that are available from your current location to countries that you have not visited yet.</p>
        <p style={{fontSize:'2.4em'}}>How are you going to pay for flights?</p>
        <p>When you click on the <span style={{fontSize:'1.4em'}}>"Trivia"</span> navigation link, you will have the opportunity to answer trivia questions to earn money to fly around the world.</p>
        <p style={{fontSize:'2.4em'}}>What can you purchase besides flights?</p>
        <p>You can purchase items at the <span style={{fontSize:'1.4em'}}>"Store"</span> with your money. These items can help you earn money quicker when answering trivia questions.</p>
        <p style={{fontSize:'2.4em'}}>Want to know more detailed information about your game?</p>
        <p>Be sure to check out the <span style={{fontSize:'1.4em'}}>"Status"</span> navigation link to see more game details than what can be displayed in the above Status-Bar.</p>
        <p style={{fontSize:'2.4em'}}>Don't just read about it, <span><a href="/login">Login</a></span> or <span><a href="/signup">Signup</a></span> now!</p>
      </div>
    )
  }
}
export default HomePage;