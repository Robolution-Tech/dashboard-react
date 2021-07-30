import React from "react"
import Layout from "../components/layout/layout"
import Seo from "../components/layout/seo"
import EventSection from "../components/sections/EventTableSection"
import WaveBackgroundRed from "../components/backgrounds/WaveBackgroundRed"

export default function DashboardPage() {
  return (
    <Layout>
      <WaveBackgroundRed />
      <EventSection />
      <Seo title="Dashboard" />
    </Layout>
  )
}
