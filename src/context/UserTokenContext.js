import React, { useState, createContext } from "react"

const defaultState = {
  userToken: "false",
  setUserToken: () => {},
}
const UserTokenContext = createContext(defaultState)

function UserTokenProvider({ children }) {
  const [userToken, setUserToken] = useState("")

  return (
    <UserTokenContext.Provider value={{ userToken, setUserToken }}>
      {children}
    </UserTokenContext.Provider>
  )
}

export { UserTokenContext, UserTokenProvider }
