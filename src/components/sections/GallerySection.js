import React from "react"
import styled from "styled-components"

const Gallery = ({ galleryData }) => {
  return (
    <Container>
      {galleryData.map(data => {
        const { img_url, description } = data
        return (
          <Box key={description}>
            <ImageContainer src={img_url} />
            <TextContainer>{description}</TextContainer>
          </Box>
        )
      })}
    </Container>
  )
}
export default Gallery

const Container = styled.div`
  display: flex;
  width: 100%;
  padding: 4% 2%;
  box-sizing: border-box;
  height: 100vh;
`

const Box = styled.div`
  flex: 1;
  overflow: hidden;
  transition: 0.5s;
  margin: 0 2%;
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.1);
  line-height: 0;
  :hover {
    flex: 1 1 50%;
  }
  > {
    width: 100%;
    height: 100%;
  }
`

const ImageContainer = styled.img`
  width: 100%;
  height: calc(100% - 10vh);
  object-fit: cover;
  transition: 0.5s;
`

const TextContainer = styled.span`
  font-size: 3.8vh;
  display: block;
  text-align: center;
  height: 10vh;
  line-height: 2.6;
`
