import React, { useContext } from "react"
import styled from "styled-components"
import { Link } from "@reach/router"
import { UserLoginContext } from "../../context/UserLoginContext"
import { StyledButton } from "../styles/ButtonStyles"
import { UserTokenContext } from "../../context/UserTokenContext"

async function postUserLogin(url = "", username = "", password = "") {
  // Default options are marked with *
  try {
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      // mode: "cors", // no-cors, *cors, same-origin
      // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: "same-origin", // include, *same-origin, omit
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },

      // redirect: "follow", // manual, *follow, error
      // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({ username: username, password: password }), // body data type must match "Content-Type" header
    })
    return response.json()
  } catch (e) {
    console.warn("Unable to fetch")
  }
}

export default function Button({ title, userName, password }) {
  const { setLogin } = useContext(UserLoginContext)
  const { setUserToken } = useContext(UserTokenContext)
  // const demoUser = process.env.GATSBY_DEMO_USER_ID
  // const demoPass = process.env.GATSBY_DEMO_PASS
  // const dirPage = useRef("/dashboard")

  return (
    <Wrapper>
      <StyledButton
        onClick={() => {
          postUserLogin(
            `https://fastapi.robolution.ca/users/login/`,
            userName,
            password
          ).then(resultData => {
            if (resultData.detail !== "Correct password") {
              console.log(resultData.detail)
              alert(resultData.detail)
            } else {
              setLogin([userName, resultData.companyId])
              setUserToken(resultData.access_token)
            }
          })
          // if (userName === demoUser && password === demoPass) {

          //   setLogin("Demo")
          // } else {
          //   // TODO: Add user verification if not demo account
          //   alert("Invalid credentials input!")
          // }
          // // alert(userName + " " + password)
        }}
      >
        <Link to="/signin">{title}</Link>
      </StyledButton>
    </Wrapper>
  )
}

const Wrapper = styled.div``
