import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Card from "../components/TOCCard"
import "./index.css"

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query HomepageTOC {
      site {
        siteMetadata {
          title
          subtitle
          description
          keywords
        }
      }
      allMarkdownRemark(sort: { order: ASC, fields: [frontmatter___order] }) {
        edges {
          node {
            id
            frontmatter {
              order
              path
              title
            }
          }
        }
      }
    }
  `)
  return (
    <div className="index">
      <div className="jumbotron gradient">
        <h1>{data.site.siteMetadata.title}</h1>
        <h2>{data.site.siteMetadata.subtitle}</h2>
      </div>

      <Card title="Table of Contents" content={data.allMarkdownRemark.edges} />
    </div>
  )
}

export default IndexPage
