import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import List from "../components/List"

export default props => {
  const posts = props.data.allMarkdownRemark.edges
  const { currentPage, numPages } = props.pageContext

  return (
    <Layout>
      <SEO
        title={props.data.site.siteMetadata.title}
        description={props.data.site.siteMetadata.description}
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
  width: 600px;
  list-style: none;
  margin: 120px auto;
  padding: 0;
  text-align: center;
  @media (max-width: 800px) {
    width: 75%;
    overflow-x: scroll;
  }
`

const Page = styled.li`
  display: inline;
  margin: 4px;
`

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
