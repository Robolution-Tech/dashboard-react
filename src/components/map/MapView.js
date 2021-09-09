import React, { useEffect, useRef, useState, useContext } from "react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
// import Video from "../sections/VideoSection"
import ReactHlsPlayer from "react-hls-player"
import { AnchorLink } from "gatsby-plugin-anchor-links"
import { UserTokenContext } from "../../context/UserTokenContext"
import { UserLoginContext } from "../../context/UserLoginContext"
import ThreeDotsWave from "../animations/LoadingAnimation"
import { globalHistory } from "@reach/router"
import styled from "styled-components"

const styles = {
  width: "100%",
  height: "500px",
  margin: "2em 0",
}

const mapboxToken = process.env.GATSBY_MAPBOX_TOKEN
mapboxgl.workerClass =
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default

async function controlStream(
  command = "off",
  user,
  token,
  companyId,
  projectId,
  deviceId
) {
  const response = await fetch(
    `https://fastapi.robolution.ca/site_monitor/streaming/stream_` +
      command +
      `/?companyId=` +
      companyId +
      `&projectId=` +
      projectId +
      `&deviceId=` +
      deviceId +
      `&token=` +
      token +
      `&user=` +
      user,
    { method: "POST", headers: { accept: "application/json" } }
  )
  return response.json()
}

async function checkStreaming(url = "") {
  try {
    const response = await fetch(url, {
      method: "GET",
    })
    if (response.ok || response.status === 200) {
      return true
    } else {
      return false
    }
  } catch (e) {
    console.log(e)
    console.log("404. Retrying...")
    return false
  }
}

const MapView = ({ projectCams }) => {
  const [map, setMap] = useState(null)
  const mapContainer = useRef(null)
  const [videoSrc, setVideoSrc] = useState("")
  const { userToken } = useContext(UserTokenContext)
  const { isLogin } = useContext(UserLoginContext)
  const [videoAvailable, setVideoAvailable] = useState(false)
  const [nTrials, setNTrails] = useState(0)

  window.addEventListener("beforeunload", function (e) {
    e.preventDefault()
    e.returnValue = ""
    controlStream("off", isLogin[0], userToken, isLogin[1], "all", "all")
    setVideoAvailable(false)
    setVideoSrc("")
  })
  useEffect(() => {
    mapboxgl.accessToken = mapboxToken
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: projectCams[0].geometry.coordinates,
        zoom: 11,
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

        //TODO: Dynamically parse project/device ID to the backend
        map.on("click", "places", e => {
          let link = e.features[0].properties.url
          setVideoSrc(link)
          controlStream("on", isLogin[0], userToken, isLogin[1], "all", "all")
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
  }, [map, projectCams, isLogin, userToken])

  useEffect(() => {
    const loop = () => {
      console.log("Started loop")
      if (!videoAvailable && nTrials < 10) {
        setNTrails(nTrials + 1)
        checkStreaming(videoSrc).then(result => setVideoAvailable(result))
      }
    }
    if (videoSrc !== "") {
      let timer = setTimeout(loop, 6000)
      if (videoAvailable) {
        clearTimeout(timer)
      }
    }

    // if (videoAvailable === true) {
    //   clearTimeout(timer)
    // }
    // const loop = () => {
    //   console.log("Started loop")
    //   if (videoAvailable === false && nTrials < 10) {
    //     setNTrails(nTrials + 1)
    //     checkStreaming(videoSrc).then(result => setVideoAvailable(result))
    //   }
    //   if (videoAvailable === false && nTrials < 10) {let timer = setTimeout(loop, 1000)}
    // }
    // if (videoSrc !== "" && nTrials === 0) {
    //   loop()
    // }
  }, [videoSrc, videoAvailable, setVideoAvailable, nTrials, setNTrails])

  useEffect(() => {
    return globalHistory.listen(({ action }) => {
      if (action === "PUSH") {
        console.log("Rediret")
        controlStream("off", isLogin[0], userToken, isLogin[1], "all", "all")
        setVideoAvailable(false)
        setVideoSrc("")
      }
    })
  }, [isLogin, userToken])

  return (
    <div>
      <AnchorLink to={"/streaming/#streaming_content"}>
        <div ref={el => (mapContainer.current = el)} style={styles} />
      </AnchorLink>

      <>
        {videoSrc === "" ? null : (
          <>
            {videoAvailable ? (
              <ReactHlsPlayer
                id="streaming_content"
                src={videoSrc}
                autoPlay={true}
                controls={true}
                width="100%"
                height="auto"
              />
            ) : (
              <LoadingContainer>
                <ThreeDotsWave />
              </LoadingContainer>
            )}
          </>

          // <Video
          //   videoSrcURL={videoSrc}
          //   videoTitle={`liveStream`}
          //   width={"100%"}
          //   height={"500px"}
          // />
          // <Title>
          //   Live streaming:
          // </Title>
        )}
      </>
    </div>
  )
}

export default MapView

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  padding: 20px;
  background: rgba(255, 255, 255, 0.6);
  border: 0.5px solid rgba(255, 255, 255, 0.6);
  box-sizing: border-box;
  box-shadow: 0px 50px 100px rgba(34, 79, 169, 0.3);
  backdrop-filter: blur(40px);
  border-radius: 20px;
`
