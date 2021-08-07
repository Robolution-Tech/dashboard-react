import React from "react"
import Layout from "../components/layout/layout"
import Seo from "../components/layout/seo"
import HeroSection from "../components/sections/HeroSection"
import ParallaxGallery from "../components/sections/ParallaxGallery"
import { ParallaxProvider } from "react-scroll-parallax"
import ExpandBillboard from "../components/sections/ExpandBillboard"
import Video from "../components/sections/VideoSection"
import styled from "styled-components"
import BigTextLittleText from "../components/sections/BigTextLittleText"
import Contact from "../components/sections/aboutus/Contact"
// import Gallery from "../components/sections/GallerySection"
// import galleryData from "../staticData/galleryData"

function IndexPage() {
  return (
    <Layout>
      <Seo title="Home" />
      <HeroSection />
      {/* <Gallery galleryData={galleryData} /> */}
      <ParallaxProvider>
        <ExpandBillboard
          img_url="/images/pics/auto.png"
          title="Fully Autonomous Skid-steer"
          subtitle="Powered by Robolution patent-pending vision-based autonomous technologies"
          description="Our fully autonomous retrofit system was deployed on a Bobcat skid-steer loader and was fully tested under extreme weather conditions (in Alberta's winter)! With only highlevel instructions (e.g., types of task, location), the system first generated highly detailed 3D map and planned a path to clear the snow."
        />
        <ParallaxGallery />
        <BigTextLittleText
          bigTextCopy="Robolution"
          bigTextTrigger="second-hiw-bigtext"
          littleText="Now it's wow time"
          bigTextDesktopSize="hiw-desktop-big-text"
          bigTextMobileSize="hiw-mobile-big-text"
          containerSize="h-screen items-center flex"
          hiwLittleText="hiw-little-text"
          purpleLine={true}
          lineTrigger="second-hiw"
        />
      </ParallaxProvider>
      <Container id="video">
        <Video
          videoSrcURL="https://www.youtube.com/embed/t_TQEVIVbMo"
          videoTitle="Skid-steer"
          width="1189px"
          height="669px"
        />
      </Container>
      <Contact
        text="Want to learn more or see it in person?"
        button_text="Request Demo"
        bg_color1="#6847ed"
        bg_color2="#606169"
      />
    </Layout>
  )
}

export default IndexPage

const Container = styled.div`
  position: relative;
  display: grid;
  max-width: 1234px;
  margin: 0 auto;
  text-align: center;
  gap: 12px;
  padding: 0 20px;
`
