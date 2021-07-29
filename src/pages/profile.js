import React from "react"
import Layout from "../components/layout/layout"
import SEO from "../components/layout/seo"
import WaveBackground from "../components/backgrounds/WaveBackground"

export default function ProfilePage() {
  return (
    <Layout>
      <WaveBackground />
      <p>This is profile page!</p>
      <SEO title="User Profile" />
    </Layout>
  )
}
