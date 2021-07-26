import React from "react"
import "./layout.css"
import { GlobalStyle } from "../styles/GlobalStyle"
import Header from "./header"

function Layout({ children }) {
  return (
    <>
      <Header />
      <GlobalStyle />
      <main>{children}</main>
    </>
  )
}

export default Layout
