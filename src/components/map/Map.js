import React, { useRef, useState, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import './Map.css'

//DUDAS => NO SE PINTA LA IMAGEN, NO SE PINTAR EL POPUP, EL WIDTH SUPERA EL 100%...
// EL MENU NO EMPIEZA CON VALOR FALSE Y SE DESPLIEGA..
// HACER IMAGENES CIRCULARES...

// import { forwardGeocoding } from '../../services/MapboxService'

const Map = ({ users }) => {

  console.log(users)
  const [userLocation, setUserLocation] = useState({})
  const [mapOpts, setMapOpts] = useState({ lng: -3.747858, lat: 40.355474, zoom: 15 })
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);

  let el = document.createElement('div');
  el.className = 'marker';
  // let popup = new mapboxgl.Popup({ offset: 25 }).setText(
  //   'Construction on the Washington Monument began in 1848.'
  // );

  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

  // forwardGeocoding('Fuente').then(res => console.log(res))

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

      
    });

    map.on("touchend", (e) => {
      setMapOpts({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      })
    })

    map.addControl(new mapboxgl.NavigationControl()) // más o menos zoom

    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      })
    );
  }

  useEffect(() => {
    users.map(user => (
      map.loadImage(
        user.avatarUrl,
        function (error, image) {
          if (error) throw error;
          map.addImage(user.id, image);
          map.addSource('point', {
            'type': 'geojson',
            'data': {
              'type': 'FeatureCollection',
              'features': [
                {
                  'type': 'Feature',
                  'geometry': {
                    'type': 'Point',
                    'coordinates': [user.location.coordinates[0], user.location.coordinates[1]]
                  }
                }
              ]
            }
          });
          map.addLayer({
            'id': 'points',
            'type': 'symbol',
            'source': 'point',
            'layout': {
              'icon-image': user.id,
              'icon-size': 0.15
            }
          });
        })
        
        // new mapboxgl.Marker(el)
        // .setLngLat(marker.geometry.coordinates)
        // .addTo(map);
    ))
  }, [mapOpts.lng, mapOpts.lat, mapOpts.zoom])

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
      <div ref={mapContainer} className="mapbox" />
    </div>
  )
}
export default Map