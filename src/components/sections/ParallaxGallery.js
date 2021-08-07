import React from "react"
import { Parallax } from "react-scroll-parallax"
import "../styles/ParallaxGallery.css"
import galleryData from "../../staticData/galleryData"
import styled from "styled-components"

const GallerySection = styled.section`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`

const TitleWrapper = styled.h2`
  margin-left: 200px;
  font-size: 4em;
  color: #262323;
  margin-bottom: 20px;
`

export default function ParallaxGallery() {
  var counter = 0
  const parallax = [
    [0, -20],
    [-20, 0],
  ]
  return (
    <>
      {galleryData.map(data => {
        const { title, img_url, description } = data
        const parallaxPram = parallax[counter % 2]
        counter++
        return (
          <GallerySection key={title}>
            <div className="box">
              <Parallax x={parallaxPram}>
                <TitleWrapper>{title}</TitleWrapper>
              </Parallax>
              <div className="container">
                <div className="imgBx jarallax">
                  <img
                    className="jarallax-img"
                    src={img_url}
                    alt={description}
                  />
                </div>
                <Parallax y={[0, -200]}>
                  <div className="content" data-jarallax-element="-200 0">
                    <p>{description}</p>
                  </div>
                </Parallax>
              </div>
            </div>
          </GallerySection>
        )
      })}
    </>
  )
}
