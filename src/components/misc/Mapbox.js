import React, { useRef, useState, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import './Map.css'

import { forwardGeocoding } from '../../services/MapboxService'

const Map = () => {

  const [userLocation, setUserLocation] = useState({})
  const [mapOpts, setMapOpts] = useState({ lng: -3.747858, lat: 40.355474, zoom: 15 })
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);

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

    // map.on("asdf", (e) => {

    //   map.loadImage(
    //     'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Cat_silhouette.svg/400px-Cat_silhouette.svg.png',
    //     function (error, image) {
    //       if (error) throw error;
    //       map.addImage('cat', image);
    //       map.addSource('point', {
    //         'type': 'geojson',
    //         'data': {
    //           'type': 'FeatureCollection',
    //           'features': [
    //             {
    //               'type': 'Feature',
    //               'geometry': {
    //                 'type': 'Point',
    //                 'coordinates': [mapOpts.lng, mapOpts.lat]
    //               }
    //             }
    //           ]
    //         }
    //       });
    //       map.addLayer({
    //         'id': 'points',
    //         'type': 'symbol',
    //         'source': 'point',
    //         'layout': {
    //           'icon-image': 'cat',
    //           'icon-size': 0.25
    //         }
    //       });
    //     })
    // })

    map.addControl(new mapboxgl.NavigationControl()) // inicialización
  }

  useEffect(() => {
    // llamar a la api para ver los usuarios
    
    map && map.loadImage(
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Cat_silhouette.svg/400px-Cat_silhouette.svg.png',
      function (error, image) {
        if (error) throw error;
        map.addImage('cat', image);
        map.addSource('point', {
          'type': 'geojson',
          'data': {
            'type': 'FeatureCollection',
            'features': [
              {
                'type': 'Feature',
                'geometry': {
                  'type': 'Point',
                  'coordinates': [mapOpts.lng, mapOpts.lat]
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
            'icon-image': 'cat',
            'icon-size': 0.25
          }
        });
      })
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