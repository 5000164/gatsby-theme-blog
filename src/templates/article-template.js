import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"
import { theme } from "../../theme"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import Article from "../components/Article"

const articleTemplate = ({ data }) => {
  const {
    markdownRemark: {
      html,
      excerpt,
      fields: { slug },
      frontmatter: { title, published, updated },
    },
  } = data

  return (
    <Layout>
      <SEO title={title} description={excerpt} slug={slug} article={true} />
      <Home to={"/"}>
        <HomeIcon>
          <path
            fill={theme.backgroundColor}
            stroke={theme.color}
            stroke-width="2px"
            d="
            M 2,14
            C 2,2 2,2 14,2
            S 26,2 26,14
              26,26 14,26
              2,26 2,14
          "
          />
        </HomeIcon>
      </Home>
      <Article slug={slug} title={title} published={published} updated={updated} content={html} />
    </Layout>
  )
}

const Home = styled(Link)`
  display: block;
  width: min(600px, 90%);
  margin: 16px auto 0;
`

const HomeIcon = styled.svg`
  width: 28px;
  height: 28px;
`

export default articleTemplate
export const query = graphql`
  query ($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      fields {
        slug
      }
      frontmatter {
        title
        published
        updated
      }
      html
      excerpt(format: PLAIN, pruneLength: 300, truncate: true)
    }
    allMarkdownRemark(sort: { fields: [frontmatter___published], order: DESC }, limit: 5) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
          html
        }
      }
    }
  }
`
