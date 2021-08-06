import React, { useContext } from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { UserLoginContext } from "../../context/UserLoginContext"
import { StyledButton } from "../styles/ButtonStyles"

export default function Button({ title, userName, password }) {
  const { isLogin, setLogin } = useContext(UserLoginContext)
  var dirPage = ""
  if (!isLogin) {
    dirPage = "/dashboard"
  } else {
    dirPage = "/signin"
  }
  return (
    <Wrapper onClick={() => setLogin(!isLogin)}>
      <Link to={dirPage}>
        <StyledButton
          onClick={() => {
            alert(userName + " " + password)
          }}
        >
          {title}
        </StyledButton>
      </Link>
    </Wrapper>
  )
}

const Wrapper = styled.div``
