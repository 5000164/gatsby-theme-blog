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
  const recentPosts = props.data.allMarkdownRemark.edges

  return (
    <Layout>
      <SEO
        title={frontmatter.title + " | " + props.data.site.siteMetadata.title}
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
`

const PostsWrapper = styled.div`
  margin: 80px 0;
`

const Post = styled(props => <Link {...props} />)`
  display: block;
  margin: 8px 0;
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
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 1140) {
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
