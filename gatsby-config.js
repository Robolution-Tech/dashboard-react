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
