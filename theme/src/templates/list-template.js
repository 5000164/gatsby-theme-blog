import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import List from "../components/List"

const listTemplate = ({ data, pageContext, location }) => {
  const posts = data.allMarkdownRemark.edges
  const { currentPage, numPages } = pageContext

  return (
    <Layout location={location}>
      <SEO
        title={data.site.siteMetadata.title}
        description={data.site.siteMetadata.description}
        slug={"/"}
        article={false}
      />
      <List posts={posts} />
      <Pagination>
        {Array.from({ length: numPages }, (_, i) => {
          if (currentPage === i + 1) {
            return (
              <Page key={`pagination-number${i + 1}`}>
                <span>{i + 1}</span>
              </Page>
            )
          } else {
            return (
              <Page key={`pagination-number${i + 1}`}>
                <Link to={`/${i === 0 ? "" : i + 1}`}>{i + 1}</Link>
              </Page>
            )
          }
        })}
      </Pagination>
    </Layout>
  )
}

const Pagination = styled.ul`
  display: flex;
  flex-wrap: wrap;
  width: 600px;
  margin: 120px auto;
  padding: 0;
  list-style: none;
  @media (max-width: 1140px) {
    width: 75%;
  }
`

const Page = styled.li`
  width: 28px;
  margin: 4px;
  padding: 0;
  text-align: center;
`

export default listTemplate
export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___published], order: DESC }, limit: $limit, skip: $skip) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            published
            updated
          }
          html
        }
      }
    }
  }
`
