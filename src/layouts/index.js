import React from "react"
import Link from "gatsby-link"
import Helmet from "react-helmet"

import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import "bootstrap/dist/css/bootstrap.css"
import "prismjs/themes/prism-solarizedlight.css"
import "code-mirror-themes/themes/monokai.css"
import "./index.css"

const TemplateWrapper = ({ children }) => {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
          subtitle
          description
          keywords
        }
      }
    }
  `)
  return (
    <div>
      <Helmet
        title={data.site.siteMetadata.title}
        meta={[
          {
            name: "description",
            content: data.site.siteMetadata.description,
          },
          {
            name: "keywords",
            content: data.site.siteMetadata.keywords.join(", "),
          },
        ]}
      />
      <div className="navbar navbar-light gradient">
        <Link to="/" className="navbar-brand">
          {data.site.siteMetadata.title}
        </Link>
      </div>
      <div className="main">{children}</div>
    </div>
  )
}

TemplateWrapper.propTypes = {
  children: PropTypes.node.isRequired,
}

export default TemplateWrapper
