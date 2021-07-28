import React, { useContext, useState, useEffect } from "react"
import styled from "styled-components"
import { eventData } from "../../testData/sampleData"
import SectionRow from "./SectionRow"
import Video from "./VideoSection"
import { VideoContext } from "../../context/UserVideoContext"
import { themes } from "../styles/ColorStyles"
import { H1 } from "../styles/TextStyles"

import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid,
} from "recharts"
import { format, parseISO, subDays } from "date-fns"

export default function EventSection() {
  const { videoChosen } = useContext(VideoContext)
  const [companyId, setCompanyId] = useState("0")
  useEffect(() => {
    // get data from GitHub api
    fetch(`http://192.168.1.68:8002/event/dog`, {
      headers: {
        accept: "application/json",
      },
    })
      .then(response => response.json()) // parse JSON from request
      .then(resultData => {
        setCompanyId(resultData.companyId)
      }) // set data for the number of stars
  }, [])

  return (
    <MainContainer>
      <Wrapper>
        <Title>{companyId} event list</Title>
        <Description>All deteced events are listed here:</Description>
        <Grid>
          {eventData.map((data, index) => (
            <SectionRow
              key={index}
              project_id={data.project_id}
              device_id={data.device_id}
              event_name={data.event_name}
              eventdate={data.eventdate}
              video_link={data.video_link}
            />
          ))}
        </Grid>
        {videoChosen === "" ? (
          <NoVideo>
            Please select any event above to view the video footage.
          </NoVideo>
        ) : (
          <Video videoSrcURL={videoChosen} videoTitle="PassCount" />
        )}
      </Wrapper>
    </MainContainer>
  )
}
const MainContainer = styled.div`
  transform: translateY(200px);
`

const Wrapper = styled.div`
  position: relative;
  display: grid;
  max-width: 1234px;
  margin: 0 auto;
  text-align: center;
  gap: 12px;
  padding: 0 20px;
`

const Title = styled.p`
  font-style: normal;
  font-size: 50px;
  line-height: 130%;
  text-transform: uppercase;
  color: #ffffff;
`

const Description = styled.p`
  max-width: 460px;
  font-size: 20px;
  line-height: 130%;
  color: rgba(255, 255, 255, 0.7);
  margin: 0 auto;
`

const Grid = styled.div`
  margin-top: 50px;
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

const NoVideo = styled(H1)`
  color: ${themes.light.text1};
  margin-top: 50px;
`
