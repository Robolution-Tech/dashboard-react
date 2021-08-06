import React from "react"
import { CenterWrapper } from "../layout/centerWrapper"
import styled, { keyframes } from "styled-components"
import "../layout/contactForm.css"
import WaveBackgroundNew from "../backgrounds/WaveBackgroundNew"
// import Fade from "react-reveal/Fade"

const ContactForm = () => {
  return (
    <Wrapper>
      <WaveBackgroundNew />
      <MainWrapper>
        {/* <Fade left duration={1000} delay={500} distance="50px"> */}
        <Container>
          <CenterWrapper>
            <div className="form">
              <form name="contact" method="POST" data-netlify="true">
                <div className="title">Contact Form</div>
                <div className="subtitle">
                  Request a demo account or just want to ask questions? We are
                  here to help!
                </div>
                <input type="hidden" name="form-name" value="contact" />
                <div className="input-container ic1">
                  <input
                    id="name"
                    className="input"
                    type="text"
                    name="name"
                    placeholder=" "
                  />
                  <div className="cut cut-short"></div>
                  <label htmlFor="name" className="placeholder">
                    Name
                  </label>
                </div>
                <div className="input-container ic2">
                  <input
                    id="email"
                    className="input"
                    type="email"
                    name="email"
                    placeholder=" "
                  />
                  <div className="cut cut-short"></div>
                  <label htmlFor="email" className="placeholder">
                    Email
                  </label>
                </div>
                <div className="message-container">
                  <textarea
                    id="message"
                    className="input"
                    type="text"
                    placeholder=" "
                    name="message"
                  />
                  <div className="cut"></div>
                  <label htmlFor="message" className="placeholder">
                    Message
                  </label>
                </div>
                <button type="submit" className="submit">
                  Submit
                </button>
              </form>
            </div>
          </CenterWrapper>
        </Container>
        {/* </Fade> */}
      </MainWrapper>
    </Wrapper>
  )
}

export default ContactForm

const Wrapper = styled.div``

const MainWrapper = styled.div`
  /* margin-top: 200px; */
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  overflow: hidden;
  /* padding-top: 100px; */
  /* max-height: 650px; */
`

const animation = keyframes`
  0% { opacity: 0; transform: translateY(-10px); filter: blur(10px); }
  100% { opacity: 1; transform: translateY(0px); filter: blur(0px); }
`

const Container = styled.div`
  margin-top: 200px;
  background-color: #15172b;
  border-radius: 20px;
  box-sizing: border-box;
  height: 650px;
  padding: 20px;
  width: 500px;

  > * {
    opacity: 0;
    animation: ${animation} 1s forwards;

    :nth-child(1) {
      animation-delay: 0s;
    }
    :nth-child(2) {
      animation-delay: 0.2s;
    }
    :nth-child(3) {
      animation-delay: 0.4s;
    }
  }
`
