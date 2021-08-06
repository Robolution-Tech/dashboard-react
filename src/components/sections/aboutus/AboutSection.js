import React, { useState, useEffect } from "react"
import { Container } from "react-bootstrap"
import Fade from "react-reveal/Fade"
import styled from "styled-components"
import { H1 } from "../../styles/TextStyles"
import { themes } from "../../styles/ColorStyles"
// import { Link } from "react-scroll"

const Header = () => {
  const [isDesktop, setIsDesktop] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (window.innerWidth > 769) {
      setIsDesktop(true)
      setIsMobile(false)
    } else {
      setIsMobile(true)
      setIsDesktop(false)
    }
  }, [])
  return (
    <MainWrapper>
      <Container>
        <Fade
          left={isDesktop}
          bottom={isMobile}
          duration={1000}
          delay={500}
          distance="50px"
        >
          <TextWrapper>Meet Our Team</TextWrapper>
        </Fade>
      </Container>
    </MainWrapper>
  )
}

export default Header

const MainWrapper = styled.section`
  min-height: 100vh;
  height: 100vh;
  display: flex;
  align-items: center;
  border-bottom: 0px;
  font-weight: 400;
  padding: 0rem 5.6rem;
  margin-bottom: 0;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -1;
  background: url("/images/pics/team/AmpersandGrey-Robolution-019.jpg") center;
  background-size: cover;
`

const TextWrapper = styled(H1)`
  color: ${themes.dark.text1};
  /* background: linear-gradient(180deg, #730040 0%, #301cbe 100%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;

  span {
    background: linear-gradient(180deg, #ffd7ff 0%, #ffb6ff 100%);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
  } */

  @media (max-width: 450px) {
    font-size: 48px;
  }
`
