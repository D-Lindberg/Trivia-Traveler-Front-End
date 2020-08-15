const BASE_URL = 'http://127.0.0.1:8000/'

export const fetchAirports = async () => {
  let response = await fetch(`${BASE_URL}airports/`)
  let data = await response.json()
  console.log(data)
  return data
}

export const fetchFlightsToAirportsNotVisited = async (iataCode, username) => {
  let response = await fetch(`${BASE_URL}flights/${iataCode}/DestinationsNotVisited/${username}`,{
    headers: { 'Content-Type': 'application/json'},
    method: 'GET',
  })
  let data = await response.json()
  console.log(data)
  return data
}

export const fetchFlightHistory = async (username) => {
  let response = await fetch(`${BASE_URL}flightHistory/${username}`,{
    headers: { 'Content-Type': 'application/json'},
    method: 'GET'
  })
  let data = await response.json()
  console.log(data)
  return data
}

export default {
  fetchAirports,
  fetchFlightsToAirportsNotVisited,
  fetchFlightHistory
}