import React from "react"
// import { Parallax } from "@react-spring/parallax"
import Layout from "../components/layout/layout"
import Seo from "../components/layout/seo"
import Header from "../components/sections/aboutus/AboutSection"
import About from "../components/sections/aboutus/CompanyHighlight"
import Members from "../components/sections/aboutus/Members"
import Contact from "../components/sections/aboutus/Contact"
// import WaveBackground from "../components/backgrounds/WaveBackground"

function AboutPage() {
  return (
    <Layout>
      <Seo title="About us" />
      {/* <WaveBackground /> */}
      <Header />
      <About />
      <Members />
      <Contact
        text="Want to work with us? Awesome!"
        button_text="Contact Us"
        bg_color1="#ebb328"
        bg_color2="#f5c95d"
      />
    </Layout>
  )
}

export default AboutPage
