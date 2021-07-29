import React, { useState, createContext } from "react"

const defaultState = {
  isLogin: false,
  setLogin: () => {},
}
const UserLoginContext = createContext(defaultState)

function UserLoginProvider({ children }) {
  const [isLogin, setLogin] = useState(false)

  return (
    <UserLoginContext.Provider value={{ isLogin, setLogin }}>
      {children}
    </UserLoginContext.Provider>
  )
}

export { UserLoginContext, UserLoginProvider }
