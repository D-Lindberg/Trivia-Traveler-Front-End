import React, { useEffect } from "react";
import { GoogleMap, Polyline, Marker, useLoadScript, InfoWindow } from '@react-google-maps/api'
import { formatRelative, set } from 'date-fns'
import mapStyles from './mapStyles'

const api_Key = "AIzaSyDEUOCjfIfLP8O_72y0x48Vy8B2IaqOuvo"
const libraryList = ['places', 'geometry']
const center = { lat: 0, lng: 0 }
const containerStyle = {
  width: '100%',
  height: '100%',
  position: "absolute",
  zindex: 5,
};
const options = {
  disabledDefaultUI: true,
  zoomControl: true,
  styles: mapStyles
}


function Map(props) {
  const [selected, setSelected] = React.useState(null)
  const [myPath, setMyPath] = React.useState([])
  const pathOptions = {
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 22000,
    paths: myPath,
    geodesic: true,
    zIndex: 1
  };
  const mapRef = React.useRef()
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map
  }, [])

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: api_Key,
    libraryList,
  })


  const flightHistoryPath = (flightArray) => {
    let output = []
    for (let i = 0; i < flightArray.length; i++) {
      let flight = flightArray[i].flight
      if (i === 0) {
        let lat = flight.origin.latitude
        let lng = flight.origin.longitude
        output.push({ lat: lat, lng: lng, })
      }
      let lat = flight.destination.latitude
      let lng = flight.destination.longitude
      output.push({ lat: lat, lng: lng, })
    }
    return output
  }


  useEffect(() => {
    let userFlightHistory = flightHistoryPath(props.flightHistory)
    setMyPath(userFlightHistory)
  },[props])



  if (loadError) return "Error loading Maps"
  if (!isLoaded) return "Loading Maps"

  return (
    <div>
      <h2>Destinations and Journeys</h2>
      <GoogleMap
        mapContainerStyle={containerStyle}
        zoom={2}
        center={center}
        mapTypeId={'satellite'}
        options={options}
        onLoad={onMapLoad}
      >
        <Polyline path={myPath} options={pathOptions} />
        {props.airports.map((airport) => (
          <Marker
            key={airport.IATA_code}
            position={{ lat: airport.latitude, lng: airport.longitude }}
            icon={{
              url: '/airport.svg',
              scaledSize: new window.google.maps.Size(30, 30),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15)
            }}
            onClick={() => {
              setSelected(airport)
            }}
          />
        ))}
        {selected && (
          <InfoWindow
            position={{ lat: selected.latitude, lng: selected.longitude }}
            onCloseClick={() => { setSelected(null) }}
          >
            <div>
              <h2>{selected.name} ({selected.IATA_code})</h2>
              <p>Located in {selected.city}, {selected.country.name}.</p>
              <p>The notation for it's timezone is {selected.timezone_offset} in relation to UTC.</p>
            </div>

          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  )
}
export default React.memo(Map)
