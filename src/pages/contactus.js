import React from "react"
import Layout from "../components/layout/layout"
import Seo from "../components/layout/seo"
import ContactForm from "../components/sections/ContactForm"

function ContactPage() {
  return (
    <Layout>
      <Seo title="Contact us" />
      <ContactForm />
    </Layout>
  )
}

export default ContactPage
