import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import Article from "../components/Article"

export default props => {
  const { markdownRemark } = props.data
  const { frontmatter, html, excerpt } = markdownRemark
  const { previous, next } = props.pageContext

  return (
    <Layout>
      <SEO
        title={frontmatter.title + " | " + props.data.site.siteMetadata.title}
        description={excerpt}
        slug={markdownRemark.fields.slug}
        article={true}
      />
      <Article
        slug={markdownRemark.fields.slug}
        title={frontmatter.title}
        published={frontmatter.published}
        updated={frontmatter.updated}
        content={html}
      />
      <StyledUl>
        <PreviousLi>
          {previous && (
            <Link to={previous.fields.slug} rel="prev">
              <div>←</div>
              <div>{previous.frontmatter.title}</div>
            </Link>
          )}
        </PreviousLi>
        <NextLi>
          {next && (
            <Link to={next.fields.slug} rel="next">
              <div>→</div>
              <div>{next.frontmatter.title}</div>
            </Link>
          )}
        </NextLi>
      </StyledUl>
    </Layout>
  )
}

const StyledUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 2em;
  width: 1140px;
  list-style: none;
  margin: 120px auto;
  padding: 0;
  @media (max-width: 800px) {
    width: 95%;
  }
`

const PreviousLi = styled.li`
  text-align: left;
`

const NextLi = styled.li`
  text-align: right;
`

export const query = graphql`
  query($slug: String!) {
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
  }
`
