import React from "react"
import Layout from "../components/layout/layout"
import Seo from "../components/layout/seo"
import WaveBackground from "../components/backgrounds/WaveBackground"

export default function StreamingPage() {
  return (
    <Layout>
      <WaveBackground />
      <p>This is the streaming page</p>
      <Seo title="Live Streaming" />
    </Layout>
  )
}
