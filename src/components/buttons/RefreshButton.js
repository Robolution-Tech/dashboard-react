import React from "react"
import styled from "styled-components"
import { Caption2 } from "../styles/TextStyles"

export default function RefreshButton() {
  return (
    <Wrapper>
      <IconWrapper>
        <Icon src="/images/icons/refresh.svg" />
      </IconWrapper>
      <TextWrapper>
        <Title>Refresh data</Title>
      </TextWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.button`
  align-items: right;
  max-width: 200px;
  height: 70px;
  padding: 12px;
  background: linear-gradient(180deg, #ffffff 0%, #d9dfff 100%);
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1),
    0px 20px 40px rgba(23, 0, 102, 0.2),
    inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  display: grid;
  grid-template-columns: 60px auto;
  align-items: center;
  gap: 5px;
  *,
  & {
    transition: 0.3s ease-in-out;
  }
  :hover {
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1),
      0px 30px 60px rgba(23, 0, 102, 0.5),
      inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.5);
    transform: translateY(-3px) scale(1.1);
  }
  /* cursor: pointer; */
`

const Title = styled(Caption2)`
  color: black;
`
const TextWrapper = styled.div`
  display: grid;
  gap: 4px;
`

const IconWrapper = styled.div`
  width: 45px;
  height: 45px;
  background: linear-gradient(200.44deg, #d3d1ed 13.57%, #cdb0eb 98.38%);
  border-radius: 50%;
  display: grid;
  justify-content: center;
  align-content: center;
  justify-self: center;
  position: relative;
  transition: transform 0.5s ease 0s;
  ${Wrapper}:hover & {
    -webkit-animation: infinite-spinning 1s ease-out 0s infinite normal;
    animation: infinite-spinning 1s ease-out 0s infinite normal;
  }
  @keyframes infinite-spinning {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`
const Icon = styled.img`
  width: 29px;
  height: 29px;
`
