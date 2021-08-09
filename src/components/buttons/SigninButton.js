import React, { useContext } from "react"
import styled from "styled-components"
import { Link } from "@reach/router"
import { UserLoginContext } from "../../context/UserLoginContext"
import { StyledButton } from "../styles/ButtonStyles"

export default function Button({ title, userName, password }) {
  const { setLogin } = useContext(UserLoginContext)
  const demoUser = process.env.GATSBY_DEMO_USER_ID
  const demoPass = process.env.GATSBY_DEMO_PASS
  // const dirPage = useRef("/dashboard")

  return (
    <Wrapper>
      <StyledButton
        onClick={() => {
          if (userName === demoUser && password === demoPass) {
            setLogin("Demo")
          } else {
            // TODO: Add user verification if not demo account
            alert("Invalid credentials input!")
          }
          // alert(userName + " " + password)
        }}
      >
        <Link to="/signin">{title}</Link>
      </StyledButton>
    </Wrapper>
  )
}

const Wrapper = styled.div``
