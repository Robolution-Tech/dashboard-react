import React from "react"
import Fade from "react-reveal/Fade"
import { H2 } from "../../styles/TextStyles"
import { CenterWrapper } from "../../layout/centerWrapper"
import styled from "styled-components"
import SimpleRoundedButton from "../../buttons/RoundedButton"

const Contact = ({ text, button_text, bg_color1, bg_color2 }) => {
  const theme = { bg1: bg_color1, bg2: bg_color2 }
  return (
    <MainWrapper theme={theme}>
      <Fade bottom duration={1000} delay={800} distance="30px">
        <CenterWrapper>
          <Title>{text}</Title>
          <SimpleRoundedButton link={"/contactus"} text={button_text} />
        </CenterWrapper>
      </Fade>
    </MainWrapper>
  )
}

export default Contact

const MainWrapper = styled.section`
  background-image: linear-gradient(
    135deg,
    ${props => props.theme.bg1} 0%,
    ${props => props.theme.bg2} 100%
  );
  -webkit-clip-path: polygon(0 15vh, 100% 0, 100% 100%, 0 100%);
  clip-path: polygon(0 15vh, 100% 0, 100% 100%, 0 100%);
  padding: 5rem 0 5rem 0;
  margin-top: 0;
  /* margin-bottom: -1px; */
  color: #fff;
`

const Title = styled(H2)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3.2rem;
  /* padding: 0 2rem; */
  backface-visibility: hidden;
  text-align: left;
  color: white;
  padding-top: 30px;
  margin-bottom: 30px;
`
