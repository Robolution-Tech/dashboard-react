import React, { useState, useEffect } from "react"
import Fade from "react-reveal/Fade"
import Tilt from "react-tilt"
import styled from "styled-components"
import Grid from "../../layout/grid"
import teamInfo from "../../../testData/data/teaminfo"
import { H2, BodyMain, H3 } from "../../styles/TextStyles"
import PlayButton from "../../buttons/PlayButton"

const Members = () => {
  const [isDesktop, setIsDesktop] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (window.innerWidth > 769) {
      setIsDesktop(true)
      setIsMobile(false)
    } else {
      setIsMobile(true)
      setIsDesktop(false)
    }
  }, [])
  return (
    <MainWrapper>
      <Fade bottom duration={1000} delay={300} distance="0px">
        <Title>Team</Title>
      </Fade>
      <Wrapper>
        <GridWrapper>
          {teamInfo.map(team => {
            const { name, description, linkedin_url, headshot_url } = team
            return (
              <Grid
                columns={2}
                style={{ gridColumnGap: "40px", marginBottom: 100 }}
              >
                <ColumnWrapper>
                  <Fade
                    left={isDesktop}
                    bottom={isMobile}
                    duration={1000}
                    delay={500}
                    distance="30px"
                  >
                    <TextWrapper>
                      <Name>{name}</Name>
                      <Description>{description}</Description>
                      {/* <Button
                      href={linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Linkedin
                    </Button> */}

                      <PlayButton
                        external_link={linkedin_url}
                        icon_url={"/images/logos/LI-In-Bug.png"}
                      />
                    </TextWrapper>
                  </Fade>
                </ColumnWrapper>
                <ColumnWrapper>
                  <Fade
                    right={isDesktop}
                    bottom={isMobile}
                    duration={1000}
                    delay={1000}
                    distance="30px"
                  >
                    <ImageWrapper>
                      <Tilt
                        options={{
                          reverse: false,
                          max: 8,
                          perspective: 1000,
                          scale: 1,
                          speed: 300,
                          transition: true,
                          axis: null,
                          reset: true,
                          easing: "cubic-bezier(.03,.98,.52,.99)",
                        }}
                      >
                        <img
                          src={headshot_url}
                          alt={name}
                          width={"auto"}
                          height={"350"}
                        />
                      </Tilt>
                    </ImageWrapper>
                  </Fade>
                </ColumnWrapper>
              </Grid>
            )
          })}
        </GridWrapper>
      </Wrapper>
    </MainWrapper>
  )
}

export default Members

const MainWrapper = styled.div`
  margin-top: -15rem;
  padding-top: 15rem;
`

const Wrapper = styled.div`
  position: relative;
  display: grid;
  max-width: 1234px;
  margin: 0 auto;
  text-align: center;
  gap: 12px;
  padding: 0 20px;
`

const GridWrapper = styled.div`
  padding-left: 15rem;
`

const Title = styled(H2)`
  text-align: center;
  color: black;
  padding-top: 30px;
  margin-bottom: 30px;
`

const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const TextWrapper = styled.div`
  text-align: left;
`

const Name = styled(H3)`
  font-weight: bold;
  margin-bottom: 1.8rem;
  font-size: 24;
`

const Description = styled(BodyMain)``

const ImageWrapper = styled.div`
  width: 90%;
  margin: 0 auto;
  & .thumbnail {
    border: none;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    transition: all 0.2s ease-out;
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.08), 0 0 6px rgba(0, 0, 0, 0.05);
    transition: 0.5s transform cubic-bezier(0.155, 1.105, 0.295, 1.12),
      0.5s box-shadow,
      0.5s -webkit-transform cubic-bezier(0.155, 1.105, 0.295, 1.12);
  }
`
