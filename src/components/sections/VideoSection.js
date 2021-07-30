import React from "react"

const Video = ({ videoSrcURL, videoTitle, width, height }) => (
  <div className="video">
    <iframe
      width={width}
      height={height}
      src={videoSrcURL.toString()}
      title={videoTitle}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      frameBorder="0"
      webkitallowfullscreen="true"
      mozallowfullscreen="true"
      allowFullScreen
    />
  </div>
)
export default Video
