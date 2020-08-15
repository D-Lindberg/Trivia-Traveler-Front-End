import React from "react";
import { GoogleMap, Polyline, Marker, useLoadScript, InfoWindow } from '@react-google-maps/api'
import {formatRelative} from 'date-fns'
import mapStyles from './mapStyles'

const containerStyle = {
  width: '80vw',
  height: '50vw',
  margin: '1rem',
  zindex: 5,
};

const libraryList = ['places', 'geometry']
const center = {lat: 0, lng: 0}
const api_Key = "AIzaSyDEUOCjfIfLP8O_72y0x48Vy8B2IaqOuvo"

const path = [
  {lat: -19.079030990601, lng: -169.92559814453},
  {lat: 28.2014833, lng: -177.3813083},
  {lat: 39.849312, lng: -104.673828},
  {lat: 16.7249971, lng: -3.00449998}
];

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
  paths: path,
  geodesic: true,
  zIndex: 1
};

const options = {
  disabledDefaultUI: true,
  zoomControl: true,
  styles: mapStyles
}

function Map() {
  //from youtube
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: api_Key,
    libraryList,
  })
  const [markers, setMarkers] = React.useState([])
  const [selected, setSelected] = React.useState(null)
  const [myPath, setMyPath] = React.useState(path)

  const onMapClick = React.useCallback((event)=>{
    console.log(event)
    setMarkers(current => [
      ...current,
      {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        time: new Date(),
      },
    ])
    setMyPath(current => [
      ...current,
      {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      },
    ])
  }, [])

  const mapRef = React.useRef()
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map
  }, [])

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
      options = {options}
      onClick={onMapClick}
      onLoad={onMapLoad}
      >
        <Polyline path={myPath} options={pathOptions} />
        {markers.map((marker) => (
          <Marker 
            key={marker.time.toISOString()} 
            position={{lat:marker.lat, lng:marker.lng}}
            icon={{
              url: '/airport.svg',
              scaledSize: new window.google.maps.Size(30,30),
              origin: new window.google.maps.Point(0,0),
              anchor: new window.google.maps.Point(15,15)
            }}
            onClick={() => {
              setSelected(marker)
            }}
          />
        ))}

        {selected && (
          <InfoWindow 
            position={{
              lat:selected.lat, 
              lng:selected.lng
            }}
            onCloseClick={() => {setSelected(null)}}
          >
              <div>
                <h2>This is an airport</h2>
                <p>You mapped it at {formatRelative(selected.time,new Date())}</p>
              </div>

          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  )
}
export default React.memo(Map)
