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
      // body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
    return response.json()
  } catch (e) {
    console.warn("Unable")
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
  const [projectData, setProjectData] = useState([])
  const [tabIndex, setTabIndex] = useState(0)
  const [eventData, setEventData] = useState([])
  const [isDataLoaded, setIsDataLoaded] = useState(false)

  // TODO: Parse company ID to query all project names
  // TODO: Add timestamps to query all events of interest
  // TODO: change keller to variable
  // TODO: Only fetch data for active tab? (Current way: fetch all events)
  // Called when site mounted
  // TODO: Add time filter
  useEffect(() => {
    getData(`https://fastapi.robolution.ca/event/keller/project_list`).then(
      resultData => {
        setProjectData(resultData.tabel_list)
        // return resultData.tabel_list
      }
    )
  }, [])

  useEffect(() => {
    if (typeof projectData[tabIndex] !== "undefined") {
      postData(
        `https://fastapi.robolution.ca/event/keller/` +
          projectData[tabIndex] +
          `/query_all`
      ).then(resultData => {
        setEventData(resultData)
        setIsDataLoaded(true)
        // return resultData.tabel_list
      })
    }
  }, [tabIndex, projectData])

  return (
    <MainContainer>
      {isLogin !== "false" ? (
        <Wrapper>
          <Title>Welcome, {isLogin}</Title>
          {isDataLoaded ? (
            <div>
              <Description>Select your proejct here:</Description>
              <Tabs
                selectedIndex={tabIndex}
                onSelect={index => setTabIndex(index)}
              >
                <TabList>
                  {projectData.map((projectID, index) => (
                    <Tab key={index} numberOfTabs={projectData.length}>
                      {projectID}
                    </Tab>
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
              <ThreeDotsWave />
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

// const StyledTab = styled(Tab)`
//   z-index: 100;
//   background: rgba(255, 255, 255, 0.6);
//   border: 0.5px solid rgba(255, 255, 255, 0.6);
//   border-radius: 10px 10px 0 0;
//   color: #fff;
//   display: table-cell;
//   width: calc(100% / ${props => props.numberOfTabs});
//   border: 1px solid transparent;
//   border-bottom: none;
//   bottom: -1px;
//   position: relative;
//   list-style: none;
//   padding: 6px 12px;
//   cursor: pointer;
//   font-size: 30px;

//   :hover {
//     box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1),
//       0px 30px 60px rgba(23, 0, 102, 0.5),
//       inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.5);
//     transform: translateY(-3px);
//   }

//   :active,
//   :visited {
//     background: rgba(255, 255, 255, 1);
//     border: 0.5px solid rgba(255, 255, 255, 1);
//     color: hsl(208, 99%, 50%);
//     border-radius: 10px 10px 0 0;
//   }
//   :focus {
//     box-shadow: 0 0 5px hsl(208, 99%, 50%);
//     border-color: hsl(208, 99%, 50%);
//     outline: none;
//   }
// `
