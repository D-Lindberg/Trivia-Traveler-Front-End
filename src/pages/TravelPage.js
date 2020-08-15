import React, { Component } from "react";
import Tables from "../Components/Table"
import TravelMap from '../Components/TravelMap'
import {fetchAirports} from '../api/djangoApi'
import fetchAirportsUserHasNotVisited from '../api/djangoApi'
import {fetchFlightHistory}  from '../api/djangoApi'

class TravelPage extends Component {
  /*
  need to have current airport or can retrieve it keep in props if props is passed
  retreive outbound flights from current aiport
  need to have flight history to display as a path on the map props of query
    flight.destination => airport obj
  */

  state = {current_airport:{}, airports:[], flightHistory:[]}
  constructor(props) {
    super(props);
    if (this.props.current_airport) {
      this.setState({ current_airport: this.props.current_airport })
    } else {
      this.setState({
        current_airport: {
          "country": {
            "name": "United States",
            "code": "US",
            "latitude": 38.0,
            "longitude": -97.0,
            "flag_url": "https://www.countryflags.io/US/shiny/64.png"
          },
          "name": "JOHN F. KENNEDY MEMORIAL AIRPORT",
          "city": "New York",
          "IATA_code": "JFK",
          "latitude": 40.6413111,
          "longitude": -73.7781391,
          "timezone_offset": "-04:00"
        }
      })
    }
  }

  async componentDidMount() {
    let airports = await fetchAirports()
    this.setState({ airports: airports.airports })
    let username = this.props.username
    let flightHistory = await fetchFlightHistory(username)
    this.setState({ flightHistory: flightHistory.flights})
  }

  render() {
    return (
      <div>
        <h2>edit this in TravelPage.js</h2>
        <div className="Map-container">
        <TravelMap 
          currentAirport={this.state.currentAirport} 
          airports={this.state.airports} 
          flightHistory={this.state.flightHistory}
        />
        </div>
        <Tables />
      </div>
    )
  }
}
export default TravelPage;