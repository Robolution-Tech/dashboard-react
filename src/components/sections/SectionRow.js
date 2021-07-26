import React, { useContext } from "react"
import styled from "styled-components"
import { VideoContext } from "../../context/UserVideoContext"

function SectionRow(props) {
  const { project_id, device_id, event_name, eventdate, video_link } = props
  const { setVideoChosen } = useContext(VideoContext)
  return (
    <Wrapper onClick={() => setVideoChosen(video_link)}>
      <Index>{project_id}</Index>
      <TextWrapper>
        <Title>{device_id}</Title>
        <Description>{event_name}</Description>
      </TextWrapper>
      <Date>{eventdate}</Date>
    </Wrapper>
  )
}

export default SectionRow

const Wrapper = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 36px auto;
  gap: 10px;
  max-width: 370px;
  padding: 10px;
  background-blend-mode: overlay;
  mix-blend-mode: normal;
  border-radius: 10px;
  cursor: pointer;
  &,
  * {
    transition: 0.8s cubic-bezier(0.075, 0.82, 0.165, 1);
  }

  :hover {
    background: rgba(68, 66, 178, 0.1);
    box-shadow: inset 0px 0px 0px 0.5px rgba(68, 66, 178, 0.2);
  }
`

const Index = styled.div`
  display: grid;
  width: 36px;
  height: 36px;
  background: rgba(68, 66, 179, 0.1);
  background-blend-mode: overlay;
  border-radius: 50%;
  place-items: center;

  font-style: normal;
  font-size: 20px;
  line-height: 24px;
  color: #000000;
`

const TextWrapper = styled.div`
  display: grid;
  gap: 8px;
  text-align: start;
`

const Title = styled.p`
  max-width: 180px;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;
  color: #3913b8;
`

const Description = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 16px;
  color: #192150;
`

const Date = styled.div`
  position: absolute;
  display: grid;
  top: 10px;
  right: 10px;
  height: 20px;
  padding: 2px 6px;
  background: rgba(68, 66, 179, 0.1);
  background-blend-mode: overlay;
  border-radius: 5px;
  place-items: center;

  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 16px;
  color: #000000;
`
