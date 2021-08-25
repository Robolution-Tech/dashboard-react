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
        "Device ID: <strong>Cam 1</strong><p> Project ID: Keller Office</p>",
      // url: "https://3927282f5050.us-west-2.playback.live-video.net/api/video/v1/us-west-2.892251806435.channel.ntymdhLALoOC.m3u8",
      url: "https://3927282f5050.us-west-2.playback.live-video.net/api/video/v1/us-west-2.892251806435.channel.ntymdhLALoOC.m3u8",
    },
    geometry: {
      type: "Point",
      coordinates: [-113.598658, 53.563947],
    },
  },
  {
    type: "Feature",
    properties: {
      description:
        "Device ID:<strong>Cam 2</strong><p>Project ID: Safeway #368</p>",
      // url: "https://3927282f5050.us-west-2.playback.live-video.net/api/video/v1/us-west-2.892251806435.channel.PfRwjOJoaWdI.m3u8",
      // url: "http://us-or-cera-2.natfrp.cloud:17865/hls/stream.m3u8",
      url: "https://streaming.robolution.ca:16868/hls/stream.m3u8",
    },
    geometry: {
      type: "Point",
      coordinates: [-113.58, 53.31],
    },
  },
]

export default function StreamingSection() {
  const demoUserID = process.env.GATSBY_DEMO_USER_ID
  const { isLogin } = useContext(UserLoginContext)
  var cameraInfo = projectDescription

  if (isLogin[0] !== demoUserID) {
    //TODO: If not Demo, we need to fetch their camera information
  }

  return (
    <Wrapper>
      <Grid>
        {isLogin[0] !== "false" ? (
          <MapView projectCams={cameraInfo} />
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
