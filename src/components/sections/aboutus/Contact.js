import React from "react"
import Fade from "react-reveal/Fade"
import { H2 } from "../../styles/TextStyles"
import { CenterWrapper } from "../../layout/centerWrapper"
import styled from "styled-components"
import SimpleRoundedButton from "../../buttons/RoundedButton"

const Contact = () => {
  return (
    <MainWrapper>
      <Fade bottom duration={1000} delay={800} distance="30px">
        <CenterWrapper>
          <Title>Want to work with us? Awesome!</Title>
          <SimpleRoundedButton link={"/contactus"} text={"Contact Us"} />
        </CenterWrapper>
      </Fade>
    </MainWrapper>
  )
}

export default Contact

const MainWrapper = styled.section`
  background-image: linear-gradient(135deg, #ebb328 0%, #f5c95d 100%);
  -webkit-clip-path: polygon(0 15vh, 100% 0, 100% 100%, 0 100%);
  clip-path: polygon(0 15vh, 100% 0, 100% 100%, 0 100%);
  padding: 5rem 0 5rem 0;
  margin-top: 0;
  /* margin-bottom: -1px; */
  color: #fff;
`

const Title = styled(H2)`
  margin-top: 3.2rem;
  padding: 0 2rem;
  backface-visibility: hidden;
  text-align: center;
  color: white;
  padding-top: 30px;
  margin-bottom: 30px;
`
