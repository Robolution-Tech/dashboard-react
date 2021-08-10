import React, { useEffect, useRef, useState } from "react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
// import Video from "../sections/VideoSection"
import ReactHlsPlayer from "react-hls-player"
import { AnchorLink } from "gatsby-plugin-anchor-links"

const styles = {
  width: "100%",
  height: "500px",
  margin: "2em 0",
}

const mapboxToken = process.env.GATSBY_MAPBOX_TOKEN
mapboxgl.workerClass =
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default

const MapView = ({ projectCams }) => {
  const [map, setMap] = useState(null)
  const mapContainer = useRef(null)
  const [videoSrc, setVideoSrc] = useState("")

  useEffect(() => {
    mapboxgl.accessToken = mapboxToken
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-113.57925370852986, 53.31250072402259],
        zoom: 15,
      })
      map.on("load", () => {
        map.addSource("places", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: projectCams,
          },
        })
        map.addLayer({
          id: "places",
          type: "circle",
          source: "places",
          paint: {
            "circle-color": "#4264fb",
            "circle-radius": 10,
            "circle-stroke-width": 4,
            "circle-stroke-color": "#ffffff",
          },
        })

        var popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false,
        })

        map.on("mouseenter", "places", function (e) {
          map.getCanvas().style.cursor = "pointer"
          var coordinates = e.features[0].geometry.coordinates.slice()
          var description = e.features[0].properties.description

          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
          }
          popup.setLngLat(coordinates).setHTML(description).addTo(map)
        })

        map.on("click", "places", e => {
          let link = e.features[0].properties.url
          setVideoSrc(link)
        })

        map.on("load", () => {
          setMap(map)
          map.resize()
        })
        map.on("mouseleave", "places", function () {
          map.getCanvas().style.cursor = ""
          popup.remove()
        })
      })
    }
    if (!map) initializeMap({ setMap, mapContainer })
  }, [map, projectCams])

  return (
    <div>
      <AnchorLink to={"/streaming/#streaming_content"}>
        <div ref={el => (mapContainer.current = el)} style={styles} />
      </AnchorLink>

      <>
        {videoSrc === "" ? null : (
          // <Video
          //   videoSrcURL={videoSrc}
          //   videoTitle={`liveStream`}
          //   width={"100%"}
          //   height={"500px"}
          // />
          // <Title>
          //   Live streaming:
          // </Title>
          <ReactHlsPlayer
            id="streaming_content"
            src={videoSrc}
            autoPlay={true}
            controls={true}
            width="100%"
            height="auto"
          />
        )}
      </>
    </div>
  )
}

export default MapView
