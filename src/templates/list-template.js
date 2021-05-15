import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import List from "../components/List"
import Author from "../components/Author"
import Search from "../components/Search"

const listTemplate = ({ data, pageContext }) => {
  const {
    site: {
      siteMetadata: { title, description },
    },
    allMarkdownRemark: { edges: posts },
  } = data
  const { currentPage, numPages } = pageContext

  return (
    <Layout>
      <SEO title={title} description={description} slug={"/"} article={false} />
      <Author />
      <SearchWrapper>
        <Search />
      </SearchWrapper>
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

const SearchWrapper = styled.div`
  display: block;
  width: min(600px, 90%);
  margin: 16px auto 0;
  text-align: center;
`

const Pagination = styled.ul`
  display: flex;
  flex-wrap: wrap;
  width: min(600px, 90%);
  margin: 16px auto 0;
  padding: 0;
  list-style: none;
`

const Page = styled.li`
  width: 60px;
  margin: 8px 0 0;
  padding: 0;
  text-align: center;
`

export default listTemplate
export const query = graphql`
  query ($skip: Int!, $limit: Int!) {
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
          }
        }
      }
    }
  }
`
