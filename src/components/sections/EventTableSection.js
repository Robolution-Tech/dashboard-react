import React, { useContext, useState, useEffect } from "react"
import styled from "styled-components"
import SectionRow from "./SectionRow"
import Video from "./VideoSection"
import { VideoContext } from "../../context/UserVideoContext"
import { UserLoginContext } from "../../context/UserLoginContext"
import { themes } from "../styles/ColorStyles"
import { H1 } from "../styles/TextStyles"
import Chart from "./ChartSection"

async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  })
  return response.json() // parses JSON response into native JavaScript objects
}

export default function EventSection() {
  const { videoChosen } = useContext(VideoContext)
  const { isLogin } = useContext(UserLoginContext)
  const [companyId, setCompanyId] = useState("0")
  const [eventData, setEventData] = useState([])
  useEffect(() => {
    // get company ID, test connection
    fetch(`http://34.208.203.215:8000/event/keller`, {
      headers: {
        accept: "application/json",
      },
    })
      .then(response => response.json()) // parse JSON from request
      .then(resultData => {
        setCompanyId(resultData.companyId)
      }) // set data for the number of stars
  }, [])

  useEffect(() => {
    postData(`http://34.208.203.215:8000/event/testdb/testtable/query_all`, {
      values: {},
      time_interval: ["string"],
    }).then(resultData => {
      setEventData(resultData)
    })
  }, [])

  return (
    <MainContainer>
      {isLogin ? (
        <Wrapper>
          <Title>{companyId} event list</Title>
          <Chart content={eventData} />
          <Description>All detected events are listed here:</Description>
          <Grid>
            {eventData.map((data, index) => (
              <SectionRow
                key={index}
                project_id={data.projectId}
                device_id={data.deviceId}
                event_name={data.event_name}
                event_value={data.event_value}
                event_date={data.time.substr(0, 16)}
                video_link={data.fileDir}
              />
            ))}
          </Grid>
          {videoChosen === "" ? (
            <BlockedContent>
              Please select any event above to view the video footage.
            </BlockedContent>
          ) : (
            <Video videoSrcURL={videoChosen} videoTitle="PassCount" />
          )}
        </Wrapper>
      ) : (
        <Wrapper>
          <BlockedContent>You need to login first!</BlockedContent>
        </Wrapper>
      )}
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
  color: rgba(0, 0, 0, 0.7);
  margin: 20px auto 0;
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

const BlockedContent = styled(H1)`
  color: ${themes.light.text1};
  margin-top: 50px;
`
