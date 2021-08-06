import styled from "styled-components"
import React from "react"

export default function WaveBackgroundNew() {
  return (
    <Wrapper>
      <Background />
      <Wave src="/images/waves/courses-wave3.svg" style={{ top: "100px" }} />
      <Wave src="/images/waves/courses-wave2.svg" style={{ top: "350px" }} />
      <BottomWave
        src="/images/waves/courses-wave1.svg"
        style={{ top: "550px" }}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
`

const Wave = styled.img`
  position: absolute;
  z-index: -1;

  @media (min-width: 1440px) {
    width: 100%;
  }
`

const BottomWave = styled(Wave)`
  @media (min-width: 1440px) {
    width: 100%;
  }
`

const Background = styled.div`
  background: linear-gradient(180deg, #4316db 0%, #9076e7 100%);
  position: absolute;
  width: 100%;
  height: 800px;
  z-index: -1;
`
