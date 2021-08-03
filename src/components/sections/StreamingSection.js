import React, { useContext } from "react"
import MapView from "../map/MapView"
import styled from "styled-components"
import { UserLoginContext } from "../../context/UserLoginContext"
import { H1 } from "../styles/TextStyles"
import { themes } from "../styles/ColorStyles"

const projectDescription = [
  {
    type: "Feature",
    properties: {
      description:
        "Device ID: <strong>Cam 1</strong><p> Project ID: Esso #795</p>",
      url: "http://192.168.1.70:8080/camera1_hls/stream.m3u8",
    },
    geometry: {
      type: "Point",
      coordinates: [-113.57925370852986, 53.31250072402259],
    },
  },
  {
    type: "Feature",
    properties: {
      description:
        "Device ID:<strong>Cam 2</strong><p>Project ID: Safeway #368</p>",
      url: "http://192.168.1.70:8080/hls/stream.m3u8",
    },
    geometry: {
      type: "Point",
      coordinates: [-113.58, 53.31],
    },
  },
]

export default function StreamingSection() {
  const { isLogin } = useContext(UserLoginContext)

  return (
    <Wrapper>
      <Grid>
        {isLogin ? (
          <MapView projectCams={projectDescription} />
        ) : (
          <BlockedContent>You need to login first!</BlockedContent>
        )}
      </Grid>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  transform: translateY(150px);
  position: relative;
  display: grid;
  max-width: 1234px;
  margin: 0 auto;
  text-align: center;
  gap: 12px;
  padding: 0 20px;
  border-radius: 20px;
`
const Grid = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 8px;
  width: 100%;
  padding: 20px;
  background: rgba(255, 255, 255, 0.6);
  border: 0.5px solid rgba(255, 255, 255, 0.6);
  box-sizing: border-box;
  box-shadow: 0px 50px 100px rgba(34, 79, 169, 0.3);
  backdrop-filter: blur(40px);
  border-radius: 20px;
`
const BlockedContent = styled(H1)`
  color: ${themes.light.text1};
  margin-top: 0px;
`
