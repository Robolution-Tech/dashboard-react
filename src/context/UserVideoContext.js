import React, { useState, createContext } from "react"

const defaultState = {
  videoChosen: "",
  setVideoChosen: () => {},
}
const VideoContext = createContext(defaultState)

function VideoProvider({ children }) {
  const [videoChosen, setVideoChosen] = useState("")

  return (
    <VideoContext.Provider value={{ videoChosen, setVideoChosen }}>
      {children}
    </VideoContext.Provider>
  )
}

export { VideoContext, VideoProvider }
