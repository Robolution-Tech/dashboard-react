import React from "react"

const Video = ({ videoSrcURL, videoTitle }) => (
  <div className="video">
    <iframe
      width="600"
      height="600"
      src={videoSrcURL.toString()}
      title={videoTitle}
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      frameBorder="0"
      webkitallowfullscreen="true"
      mozallowfullscreen="true"
      allowFullScreen
    />
  </div>
)
export default Video
