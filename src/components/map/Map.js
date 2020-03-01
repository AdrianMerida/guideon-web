import React, { useRef, useState, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import './Map.css'
import { WithAuthConsumer } from '../../contexts/AuthContext'

const Map = ({ users, currentUser }) => {

  const [userLocation, setUserLocation] = useState({})
  const [mapOpts, setMapOpts] = useState({ lng: -3.747858, lat: 40.355474, zoom: 15 })
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);

  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

  const createMarker = (user, map) => {

    const el = document.createElement('div')
    el.className = 'marker'
    el.style.backgroundImage = `url(${user.avatarUrl})`
    el.style.width = (2 * mapOpts.zoom).toString() + 'px'
    el.style.height = (2 * mapOpts.zoom).toString() + 'px'
    new mapboxgl.Marker(el)
      .setLngLat(user.location.coordinates)
      .setPopup(new mapboxgl.Popup({ offset: 25 })
        .setHTML(`
        <div class="user-marker">
          <div class="user-image">
            <img src='${user.avatarUrl}'/>
          </div>
          <div class="user-data">
            <h1 class="user-name"><strong>${user.name}</strong></h1>
            <p>(${user.rating}/10)</p>
            <div class="user-icons">
              <a href="/chats/${user.id}"><i class="fa fa-comment fa-2x"></i></a>
            </div>
          </div>
        </div>
        `))
      .addTo(map)
  }

  const initializeMap = ({ setMap, mapContainer }) => {

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11", // https://docs.mapbox.com/api/maps/#styles
      center: [ // centro del mapa
        userLocation.lng ? userLocation.lng : mapOpts.lng,
        userLocation.lat ? userLocation.lat : mapOpts.lat
      ],
      zoom: mapOpts.zoom,
      "glyphs": "mapbox://fonts/mapbox/{fontstack}/{range}.pbf" // iconos propios que tiene mapbox
    });

    map.on("load", () => {
      setMap(map);
      map.resize();

      users.forEach(user => {
        if (user.id.toString() !== currentUser.id.toString()) {
          createMarker(user, map)
        }
      })

      // map.addControl(new mapboxgl.NavigationControl()) // más o menos zoom

      map.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true
          },
          trackUserLocation: true
        })
      );
    })

    map.on("touchend", (e) => {
      setMapOpts({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      })
    })

  }

  useEffect(() => {

    if (!map) {
      initializeMap({ setMap, mapContainer })
    } else {
      setMapOpts({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4)
      })

      navigator.geolocation.getCurrentPosition((el) => {
        setUserLocation({ lng: el.coords.longitude, lat: el.coords.latitude })
        map.flyTo({
          center: [
            el.coords.longitude,
            el.coords.latitude
          ]
        })
      })
    }
  }, [map]);

  return (
    <div className="Map">
      {/* {showModal && <Modal></Modal>} */}
      <div ref={mapContainer} className="mapbox" />
    </div>
  )
}

export default WithAuthConsumer(Map)