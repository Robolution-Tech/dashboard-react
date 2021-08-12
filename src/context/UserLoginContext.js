import React, { useState, createContext } from "react"

const defaultState = {
  isLogin: ["false", ""], // username, then companyID
  setLogin: () => {},
}
const UserLoginContext = createContext(defaultState)

function UserLoginProvider({ children }) {
  const [isLogin, setLogin] = useState(["false", " "]) // TODO: add a new context for username and another context for compnay ID

  return (
    <UserLoginContext.Provider value={{ isLogin, setLogin }}>
      {children}
    </UserLoginContext.Provider>
  )
}

export { UserLoginContext, UserLoginProvider }
