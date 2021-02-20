import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import Article from "../components/Article"
import Author from "../components/Author"

const articleTemplate = ({ data, pageContext, location }) => {
  const { markdownRemark } = data
  const { frontmatter, html, excerpt } = markdownRemark
  const { previous, next } = pageContext
  const recentPosts = data.allMarkdownRemark.edges

  return (
    <Layout location={location}>
      <SEO
        title={frontmatter.title + " | " + data.site.siteMetadata.title}
        description={excerpt}
        featuredImage={frontmatter.featuredImage}
        slug={markdownRemark.fields.slug}
        article={true}
      />
      <Article
        slug={markdownRemark.fields.slug}
        title={frontmatter.title}
        published={frontmatter.published}
        updated={frontmatter.updated}
        featuredImage={frontmatter.featuredImage}
        content={html}
      />
      <Author />
      <RelatedPosts>
        {next && (
          <PostsWrapper>
            <div>Next Post</div>
            <Post to={next.fields.slug}>
              <div>{next.frontmatter.title}</div>
            </Post>
          </PostsWrapper>
        )}
        {previous && (
          <PostsWrapper>
            <div>Previous Post</div>
            <Post to={previous.fields.slug}>
              <div>{previous.frontmatter.title}</div>
            </Post>
          </PostsWrapper>
        )}
        <PostsWrapper>
          <div>Recent Posts</div>
          {recentPosts.map(({ node }) => (
            <Post to={node.fields.slug} key={node.fields.slug}>
              <div>{node.frontmatter.title}</div>
            </Post>
          ))}
        </PostsWrapper>
      </RelatedPosts>
    </Layout>
  )
}

const RelatedPosts = styled.div`
  width: 600px;
  margin: 240px auto;
  @media (max-width: 1140px) {
    width: 75%;
  }
`

const PostsWrapper = styled.div`
  margin: 80px 0;
`

const Post = styled((props) => <Link {...props} />)`
  display: block;
  margin: 8px 0;
`

export default articleTemplate
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
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 1140, maxHeight: 476) {
              ...GatsbyImageSharpFluid
            }
          }
        }
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
