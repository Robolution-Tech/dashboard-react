import React from "react"
import Layout from "../components/layout/layout"
import Seo from "../components/layout/seo"
import LoginSection from "../components/sections/LoginSections"
import WaveBackgroundYellow from "../components/backgrounds/WaveBackgroundYellow"

export default function SigninPage() {
  return (
    <Layout>
      <WaveBackgroundYellow />
      <Seo title="User Login" />
      <LoginSection />
    </Layout>
  )
}
