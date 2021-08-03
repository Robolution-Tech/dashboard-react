import React, { useContext, useState, useEffect } from "react"
import styled from "styled-components"
import SectionRow from "./SectionRow"
import Video from "./VideoSection"
import { VideoContext } from "../../context/UserVideoContext"
import { UserLoginContext } from "../../context/UserLoginContext"
import { themes } from "../styles/ColorStyles"
import { H1 } from "../styles/TextStyles"
import Chart from "./ChartSection"

const formatTimeByOffset = (dateString, offset) => {
  // Params:
  // How the backend sends me a timestamp
  // dateString: on the form yyyy-mm-dd hh:mm:ss
  // offset: the amount of hours to add.
  // If we pass anything falsy return empty string
  if (!dateString) return ""
  if (dateString.length === 0) return ""
  // Step a: Parse the backend date string
  // Get Parameters needed to create a new date object
  const year = dateString.slice(0, 4)
  const month = dateString.slice(5, 7)
  const day = dateString.slice(8, 10)
  const hour = dateString.slice(11, 13)
  const minute = dateString.slice(14, 16)
  const second = dateString.slice(17, 19)
  // Step: bMake a JS date object with the data
  const dateObject = new Date(
    `${year}-${month}-${day}T${hour}:${minute}:${second}`
  )
  // Step c: Get the current hours from the object
  const currentHours = dateObject.getHours()
  // Step d: Add the offset to the date object
  dateObject.setHours(currentHours + offset)
  // Step e: stringify the date object, replace the T with a space and slice off the seconds.
  const newDateString = dateObject.toISOString().replace("T", " ").slice(0, 16)
  // Step f: Return the new formatted date string with the added offset
  return `${newDateString}`
}

async function postData(url = "") {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    // mode: "cors", // no-cors, *cors, same-origin
    // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: "same-origin", // include, *same-origin, omit
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    // redirect: "follow", // manual, *follow, error
    // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    // body: JSON.stringify(data), // body data type must match "Content-Type" header
  })
  return response.json() // parses JSON response into native JavaScript objects
}

export default function EventSection() {
  const { videoChosen } = useContext(VideoContext)
  const { isLogin } = useContext(UserLoginContext)
  const [companyId, setCompanyId] = useState("")
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

  // useEffect(() => {
  //   postData(`http://34.208.203.215:8000/event/keller/esso/query_all`, {
  //     values: {},
  //     time_interval: ["string"],
  //   }).then(resultData => {
  //     setEventData(resultData)
  //   })
  // }, [])
  useEffect(() => {
    postData(`http://34.208.203.215:8000/event/keller/esso/query_all`).then(
      resultData => {
        setEventData(resultData)
      }
    )
  }, [])

  return (
    <MainContainer>
      {isLogin ? (
        <Wrapper>
          <Title>Welcome, {companyId}</Title>
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
                event_date={formatTimeByOffset(data.time, -12).substr(0, 16)}
                video_link={data.fileDir}
              />
            ))}
          </Grid>
          {videoChosen === "" ? (
            <BlockedContent>
              Please select any event above to view the video footage.
            </BlockedContent>
          ) : (
            <Video
              videoSrcURL={videoChosen}
              videoTitle="PassCount"
              width={"680px"}
              height={"480px"}
            />
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
  //max-width: 460px;
  //font-size: 20px;
  //line-height: 130%;
  //color: rgba(0, 0, 0, 0.7);
  //margin: 20px auto 0;
  font-style: normal;
  font-size: 50px;
  line-height: 130%;
  color: rgba(0, 0, 0, 0.8);
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
  margin-top: 50px;
`
