require("dotenv").config({
  path: `.env`,
})

module.exports = {
  siteMetadata: {
    title: `Robolution Homepage`,
    description: `This is Robolution's homepage`,
    author: `@bowen`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/static/images`,
      },
    },
    `gatsby-plugin-styled-components`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        // Setting a color is optional.
        color: `tomato`,
        // Disable the loading spinner.
        showSpinner: false,
      },
    },
    // `gatsby-transformer-sharp`,
    // `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Robolution Official Website`,
        short_name: `Robolution`,
        start_url: `/`,
        background_color: `#f7f0eb`,
        theme_color: `#a2466c`,
        display: `standalone`,
        icon: `static/images/logos/logo.png`,
      },
    },
  ],
}

// {
//   resolve: `gatsby-source-graphql`,
//   options: {
//     typeName: `Event`,
//     fieldName: `keller`,
//     url: `http://192.168.1.68:8002/event/keller`,
//     headers: {
//       accept: "application/json",
//       "Content-Type": "application/json",
//     },
//   },
// },
