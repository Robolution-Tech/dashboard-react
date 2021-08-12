/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

// You can delete this file if you're not using it
import React from "react"
import { VideoProvider } from "./src/context/UserVideoContext"
import { UserLoginProvider } from "./src/context/UserLoginContext"
import { UserTokenProvider } from "./src/context/UserTokenContext"

export const wrapRootElement = ({ element }) => {
  // return <VideoProvider>{element}</VideoProvider>
  return (
    <UserLoginProvider>
      <UserTokenProvider>
      <VideoProvider>{element}</VideoProvider>
      </UserTokenProvider>
    </UserLoginProvider>
  )
}
