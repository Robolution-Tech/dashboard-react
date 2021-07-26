import React from "react"
import Layout from "../components/layout/layout"
import SEO from "../components/layout/seo"
import LoginSection from "../components/sections/LoginSections"
import WaveBackground from "../components/backgrounds/WaveBackground"

export default function SigninPage() {
  return (
    <Layout>
      <WaveBackground />
      <SEO title="User Login" />
      <LoginSection />
    </Layout>
  )
}
