import React, { useState, useEffect } from "react"
import Fade from "react-reveal/Fade"
import styled from "styled-components"
import { H2, SmallText } from "../../styles/TextStyles"
import Grid from "../../layout/grid"
import { CenterWrapper } from "../../layout/centerWrapper"

const About = () => {
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
      <CenterWrapper>
        <Fade bottom duration={1000} delay={300} distance="0px">
          <Title>Company Overview</Title>
        </Fade>
        <Grid columns={2} style={{ gridColumnGap: "32px", marginBottom: 100 }}>
          <ColumnWrapper>
            <Fade
              left={isDesktop}
              bottom={isMobile}
              duration={1000}
              delay={1000}
              distance="30px"
            >
              <ParagraphWrapper>
                <Paragraph>
                  Founded by three self-driving and robotics engineers in
                  Edmonton in 2019, Robolution is dedicated to improve
                  productivity and eliminate workplace injuries by automating
                  construction equipment. With more than 15 years of combined
                  experience in developing automation and AI models, our
                  expertise covers every aspect of building a self-driving
                  machine.
                </Paragraph>
              </ParagraphWrapper>
            </Fade>
          </ColumnWrapper>
          <ColumnWrapper>
            <Fade bottom duration={1000} delay={600} distance="30px">
              <ImgWrapper>
                <img
                  src={"/images/pics/team/AmpersandGrey-Robolution-018.jpg"}
                  alt={`Team photo2`}
                  width={"auto"}
                  height={"350"}
                />
              </ImgWrapper>
              {/*<Paragraph>adefd</Paragraph>*/}
            </Fade>
          </ColumnWrapper>
        </Grid>
      </CenterWrapper>
    </MainWrapper>
  )
}

export default About

const MainWrapper = styled.section`
  background-color: black;
  background-image: linear-gradient(135deg, #ebb328 0%, #f5c95d 100%);
  color: #fff;
  height: 100%;
  border-top: 0px;
  -webkit-clip-path: polygon(0 0, 100% 0, 100% 80%, 0 100%);
  clip-path: polygon(0 0, 100% 0, 100% 80%, 0 100%);
  padding-bottom: 10%;
`
const Title = styled(H2)`
  text-align: center;
  color: white;
  padding-top: 30px;
  margin-bottom: 30px;
`

const ImgWrapper = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
`
const Paragraph = styled(SmallText)`
  text-align: left;
  font-size: 20px;
  line-height: 2;
`

const ParagraphWrapper = styled.div`
  margin-left: 100px;
  display: flex;
  height: 100%;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`

const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
