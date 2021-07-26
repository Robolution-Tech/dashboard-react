import React from "react"
import WaveBackground from "../components/backgrounds/WaveBackground"
import Layout from "../components/layout/layout"
import SEO from "../components/layout/seo"
import EventSection from "../components/sections/EventTableSection"

export default function DashboardPage() {
  return (
    <Layout>
      <WaveBackground />
      <EventSection />
      <SEO title="Dashboard" />
    </Layout>
  )
}
