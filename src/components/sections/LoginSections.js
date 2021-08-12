import React, { useContext, useState } from "react"
import styled from "styled-components"
import Input from "../layout/inputs"
import Button from "../buttons/SigninButton"
import { UserLoginContext } from "../../context/UserLoginContext"
import RegularButton from "../buttons/RegularButton"

export default function LoginSection() {
  const { isLogin } = useContext(UserLoginContext)
  const [userName, setUserName] = useState("")
  const [userPassword, setUserPassword] = useState("")
  return (
    <Wrapper>
      {isLogin[0] !== "false" ? (
        <MainContainer>
          <WelcomeText>Welcome Back {isLogin[0]}</WelcomeText>
          {/* <WelcomeText>Keller Cons.</WelcomeText> */}
          <RegularButton title="Take me to the dashboard" dst="/dashboard" />
        </MainContainer>
      ) : (
        <Wrapper>
          <MainContainer>
            <WelcomeText>Welcome</WelcomeText>
            <InputContainer>
              <Input
                type="text"
                placeholder="Email"
                value={userName}
                changed={e => setUserName(e)}
              />
              <Input
                type="password"
                placeholder="Password"
                value={userPassword}
                changed={e => setUserPassword(e)}
              />
            </InputContainer>
            <Button
              title="Sign in"
              userName={userName}
              password={userPassword}
            />
            <HorizontalRule />
            <ForgotPassword
              onClick={() => {
                alert(
                  "Please contact admin@robolution.ca to retrieve your password!"
                )
              }}
            >
              Forgot Password ?
            </ForgotPassword>
          </MainContainer>
        </Wrapper>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  overflow: hidden;
`

const MainContainer = styled.div`
  margin-top: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  /* height: 80vh; */
  /* width: 30vw; */
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border-radius: 20px;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.4rem;
  @media only screen and (max-width: 320px) {
    width: 80vw;
    height: 90vh;
    hr {
      margin-bottom: 0.3rem;
    }
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 360px) {
    width: 80vw;
    height: 90vh;
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 411px) {
    width: 80vw;
    height: 90vh;
  }

  @media only screen and (min-width: 768px) {
    width: 80vw;
    height: 80vh;
  }
  @media only screen and (min-width: 1024px) {
    width: 70vw;
    height: 50vh;
  }
  @media only screen and (min-width: 1280px) {
    width: 30vw;
    height: 70vh;
  }
`

const WelcomeText = styled.h2`
  text-align: center;
  font-size: 50px;
  margin: 0 0 2rem 0;
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 20%;
  width: 100%;
`

const HorizontalRule = styled.hr`
  width: 90%;
  height: 0.3rem;
  border-radius: 0.8rem;
  border: none;
  background: #ebd0d0 linear-gradient(to right, #14163c 0%, #03217b 79%);
  margin: 1.5rem 0 1rem 0;
  backdrop-filter: blur(25px);
`

const ForgotPassword = styled.h4`
  color: rgba(0, 0, 0, 0.8);
  cursor: pointer;
`
