import React from "react"
// import { Parallax } from "@react-spring/parallax"
import Layout from "../components/layout/layout"
import Seo from "../components/layout/seo"
import Header from "../components/sections/aboutus/AboutSection"
import About from "../components/sections/aboutus/CompanyHighlight"
import Members from "../components/sections/aboutus/Members"
// import WaveBackground from "../components/backgrounds/WaveBackground"

function AboutPage() {
  return (
    <Layout>
      <Seo title="About us" />
      {/* <WaveBackground /> */}
      <Header />
      <About />
      <Members />
    </Layout>
  )
}

export default AboutPage
