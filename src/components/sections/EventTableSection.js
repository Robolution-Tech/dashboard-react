import React, { useContext, useState, useEffect } from "react"
import styled from "styled-components"
import SectionRow from "./SectionRow"
import Video from "./VideoSection"
import { VideoContext } from "../../context/UserVideoContext"
import { UserLoginContext } from "../../context/UserLoginContext"
import { themes } from "../styles/ColorStyles"
import { H1 } from "../styles/TextStyles"
import Chart from "./ChartSection"
// import { CenterWrapper } from "../layout/centerWrapper"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"
import ThreeDotsWave from "../animations/LoadingAnimation"
import "../styles/ReactTabs.css"
import { RangeDatePicker } from "react-google-flight-datepicker"
import "react-google-flight-datepicker/dist/main.css"
import { UserTokenContext } from "../../context/UserTokenContext"

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

async function postDataInRange(url = "", startTime = "", endTime = "") {
  // Default options are marked with *
  try {
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      // mode: "cors", // no-cors, *cors, same-origin
      // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: "same-origin", // include, *same-origin, omit
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },

      // redirect: "follow", // manual, *follow, error
      // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({ values: {}, time_interval: [startTime, endTime] }), // body data type must match "Content-Type" header
    })
    return response.json()
  } catch (e) {
    console.warn("Unable to fetch")
  }
}

async function getData(url = "") {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    // mode: "cors", // no-cors, *cors, same-origin
    // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: "same-origin", // include, *same-origin, omit
    headers: {
      accept: "application/json",
    },
  })
  return response.json() // parses JSON response into native JavaScript objects
}

export default function EventSection() {
  const { videoChosen } = useContext(VideoContext)
  const { isLogin } = useContext(UserLoginContext)
  const { userToken } = useContext(UserTokenContext)
  const [projectData, setProjectData] = useState([])
  const [tabIndex, setTabIndex] = useState(0)
  const [eventData, setEventData] = useState([])
  const [dateRange, setDateRange] = useState([
    new Date(2021, 1, 1),
    new Date(2022, 1, 1),
  ])
  const [isDataLoaded, setIsDataLoaded] = useState(false)
  const [isRangeValid, setIsRangeValid] = useState(true)

  // TODO: Parse company ID to query all project names
  // TODO: Add timestamps to query all events of interest
  // TODO: change keller to variable
  // TODO: Only fetch data for active tab? (Current way: fetch all events)
  // Called when site mounted
  // TODO: Add time filter
  useEffect(() => {
    getData(
      `https://fastapi.robolution.ca/event/` +
        isLogin[1] +
        `/project_list?token=` +
        userToken +
        `&user=` +
        isLogin[0]
    ).then(resultData => {
      setProjectData(resultData.tabel_list)
      // return resultData.tabel_list
    })
  }, [isLogin, userToken])

  useEffect(() => {
    if (projectData !== null && typeof projectData !== "undefined") {
      if (
        typeof projectData[tabIndex] !== "undefined" &&
        dateRange[0] !== null &&
        dateRange[1] !== null
      ) {
        const startDate = dateRange[0]
          .toISOString()
          .slice(0, -1)
          .replace("T", " ")
        const endDate = dateRange[1]
          .toISOString()
          .slice(0, -1)
          .replace("T", " ")
        postDataInRange(
          `https://fastapi.robolution.ca/event/` +
            isLogin[1] +
            `/` +
            projectData[tabIndex] +
            `/query_time?token=` +
            userToken +
            `&user=` +
            isLogin[0],
          startDate,
          endDate
        ).then(resultData => {
          // console.log(resultData)
          if (
            typeof resultData == "undefined" ||
            typeof resultData[0] === "undefined"
          ) {
            setIsDataLoaded(false)
            setIsRangeValid(false)
          } else {
            setEventData(resultData)
            setIsDataLoaded(true)
            setIsRangeValid(true)
          }
          // console.log(resultData)

          // return resultData.tabel_list
        })
      }
    }
  }, [tabIndex, projectData, dateRange, isLogin, userToken])

  // useEffect(() => {
  //   const startDate = dateRange[0].toISOString().slice(0, -1).replace("T", " ")
  //   const endDate = dateRange[1].toISOString().slice(0, -1).replace("T", " ")

  //   console.log(dateRange[0].toISOString().slice(0, -1).replace("T", " "))
  // }, [dateRange])

  return (
    <MainContainer>
      {isLogin[0] !== "false" ? (
        <Wrapper>
          <Title>Welcome, {isLogin[0] + ` from ` + isLogin[1]}</Title>
          {isDataLoaded ? (
            <div>
              <Description>Select your proejct and date range:</Description>
              <RangeDatePicker
                onChange={(startDate, endDate) => {
                  setDateRange([startDate, endDate])
                }}
                startDate={dateRange[0]}
                endDate={dateRange[1]}
                // minDate={new Date(1900, 0, 1)}
                // maxDate={new Date(2100, 0, 1)}
                // dateFormat="D"
                // monthFormat="MMM YYYY"
                startDatePlaceholder="Start Date"
                endDatePlaceholder="End Date"
                highlightToday="true"
                // disabled={false}
                // className="my-own-class-name"
                // startWeekDay="monday"
              />
              <Tabs
                selectedIndex={tabIndex}
                onSelect={index => setTabIndex(index)}
              >
                <TabList>
                  {projectData.map((projectID, index) => (
                    <Tab key={index}>{projectID}</Tab>
                  ))}
                </TabList>
                {projectData.map(projectID => (
                  <TabPanel key={projectID}>
                    <Chart content={eventData} />
                    <Grid>
                      {eventData.map((data, index) => (
                        <SectionRow
                          key={index}
                          project_id={data.projectId}
                          device_id={data.deviceId}
                          event_name={data.event_name}
                          event_value={data.event_value}
                          event_date={formatTimeByOffset(data.time, 0).substr(
                            0,
                            16
                          )}
                          video_link={data.fileDir}
                        />
                      ))}
                    </Grid>
                  </TabPanel>
                ))}
              </Tabs>

              {videoChosen === "" ? (
                <BlockedContent>
                  Please select any event above to view the video footage.
                </BlockedContent>
              ) : (
                <Container>
                  <Video
                    videoSrcURL={videoChosen}
                    videoTitle="PassCount"
                    width={"680px"}
                    height={"480px"}
                  />
                </Container>
              )}
            </div>
          ) : (
            <LoadingContainer>
              {isRangeValid ? (
                <ThreeDotsWave />
              ) : (
                <BlockedContent>
                  No event found in the selected range!
                  <RangeDatePicker
                    onChange={(startDate, endDate) => {
                      setDateRange([startDate, endDate])
                    }}
                    // minDate={new Date(1900, 0, 1)}
                    // maxDate={new Date(2100, 0, 1)}
                    // dateFormat="D"
                    // monthFormat="MMM YYYY"
                    startDatePlaceholder="Start Date"
                    endDatePlaceholder="End Date"
                    highlightToday="true"
                    // disabled={false}
                    // className="my-own-class-name"
                    // startWeekDay="monday"
                  />
                </BlockedContent>
              )}
            </LoadingContainer>
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
  margin-bottom: 30px;
`

const Description = styled.p`
  /* //max-width: 460px;
  //font-size: 20px;
  //line-height: 130%;
  //color: rgba(0, 0, 0, 0.7);
  //margin: 20px auto 0; */
  font-style: normal;
  text-align: left;
  font-size: 35px;
  line-height: 130%;
  color: #fff;
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
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 30px;
`
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
