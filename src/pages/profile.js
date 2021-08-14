import React from "react"
import Layout from "../components/layout/layout"
import Seo from "../components/layout/seo"
import WaveBackground from "../components/backgrounds/WaveBackground"
import { H1 } from "../components/styles/TextStyles"
import styled from "styled-components"
import { themes } from "../components/styles/ColorStyles"

export default function ProfilePage() {
  return (
    <Layout>
      <WaveBackground />
      <Wrapper>
        <BlockedContent>User profile is under construction!</BlockedContent>
      </Wrapper>
      <Seo title="User Profile" />
    </Layout>
  )
}

const Wrapper = styled.div`
  transform: translateY(200px);
  position: relative;
  display: grid;
  max-width: 1234px;
  margin: 0 auto;
  text-align: center;
  gap: 12px;
  padding: 0 20px;
  border-radius: 20px;
`

const BlockedContent = styled(H1)`
  color: ${themes.light.text1};
  margin-top: 0px;
`
