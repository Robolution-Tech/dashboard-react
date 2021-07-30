import React from "react"
import Layout from "../components/layout/layout"
import Seo from "../components/layout/seo"
import WaveBackground from "../components/backgrounds/WaveBackground"
import StreamingSection from "../components/sections/StreamingSection"

export default function StreamingPage() {
  return (
    <Layout>
      <WaveBackground />
      <StreamingSection />
      <Seo title="Live Streaming" />
    </Layout>
  )
}
