import React from "react"
import { graphql, Link, StaticQuery } from "gatsby"
import styled from "styled-components"
import moment from "moment"
import Img from "gatsby-image"

const Article = ({ data, slug, title, published, updated, content, featuredImage }) => {
  const formatter = date =>
    moment(date, "YYYY-MM-DD HH:mm:ss Z")
      .local()
      .format("MMMM Do, YYYY")
  const historyLink = data.site.siteMetadata.repository + "/commits/master/src/posts" + slug.slice(0, -1) + ".md"

  return (
    <>
      <Wrapper>
        {featuredImage && (
          <FeaturedImageWrapper>
            <Img fluid={featuredImage.childImageSharp.fluid} />
          </FeaturedImageWrapper>
        )}
        <StyledTitle>{title}</StyledTitle>
        <Date>
          Published <Link to={slug}>{formatter(published)}</Link>
        </Date>
        {published !== updated && (
          <Date>
            Updated <a href={historyLink}>{formatter(updated)}</a>
          </Date>
        )}
      </Wrapper>
      <StyledArticle dangerouslySetInnerHTML={{ __html: content }} />
    </>
  )
}

const Wrapper = styled.div`
  position: relative;
  overflow: hidden;
  margin: 0 auto;
  padding: 220px 0;
`

const FeaturedImageWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  width: 1140px;
  margin: 0 auto;
`

const StyledTitle = styled.div`
  display: block;
  width: 1140px;
  margin: 10px auto;
  padding: 8px 0 4px;
  font-family: serif;
  font-size: 4.8rem;
  font-weight: bold;
  text-align: center;
  letter-spacing: -0.25rem;
  line-height: 1.3;
  text-decoration: none;
  color: hsl(235, 10%, 5%);
  :visited {
    color: hsl(235, 10%, 5%);
  }
  background-color: hsl(0, 100%, 100%);
  @media (max-width: 800px) {
    width: 95%;
    font-size: 3.2rem;
  }
`

const Date = styled.div`
  width: 600px;
  margin: 5px auto;
  padding: 4px 0;
  font-size: 1.2rem;
  text-align: center;
  background-color: hsl(0, 100%, 100%);
  @media (max-width: 800px) {
    width: 95%;
  }
`

const StyledArticle = styled.article`
  p {
    width: 600px;
    margin: 20px auto;
  }
  @media (max-width: 800px) {
    p {
      width: 75%;
    }
  }
  h1 {
    width: 600px;
    margin: 80px auto 2.5rem;
    padding: 0;
    font-size: 3.2rem;
    font-weight: bold;
    letter-spacing: -0.1rem;
    line-height: 1.3;
    color: hsl(235, 10%, 5%);
  }
  @media (max-width: 800px) {
    h1 {
      width: 75%;
    }
  }
  h2 {
    width: 600px;
    margin: 40px auto 1rem;
    padding: 0;
    font-size: 1.8rem;
    font-weight: bold;
    letter-spacing: -0.1rem;
    line-height: 1.3;
    color: hsl(235, 10%, 5%);
  }
  @media (max-width: 800px) {
    h2 {
      width: 75%;
    }
  }
  h1 + h2 {
    margin-top: 20px;
  }
  a {
    text-decoration: underline;
  }
  > ul,
  > ol {
    width: 600px;
    margin: auto;
    padding-left: 20px;
  }
  @media (max-width: 800px) {
    > ul,
    > ol {
      width: 70%;
      padding-left: 5%;
    }
  }
  ul p,
  ol p {
    width: auto;
    margin-top: 0;
    margin-bottom: 0;
  }
  figcaption {
    text-align: center;
  }
  @media (max-width: 800px) {
    img {
      width: 100%;
    }
  }
  blockquote {
    width: 600px;
    margin: 20px auto;
  }
  @media (max-width: 800px) {
    blockquote {
      width: 75%;
    }
  }
  blockquote > p {
    position: relative;
    width: 600px;
    padding-left: 20px;
  }
  @media (max-width: 800px) {
    blockquote > p {
      width: 70%;
      padding-left: 5%;
    }
  }
  blockquote > p::before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: #e3e4e6;
    border-radius: 8px;
  }
  pre {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1140px;
    margin: 40px auto;
    padding: 0;
  }
  @media (max-width: 800px) {
    pre {
      width: 100%;
    }
  }
  pre > code {
    width: 1140px;
    padding: 20px;
  }
  @media (max-width: 800px) {
    pre > code {
      width: 100%;
    }
  }
  iframe {
    display: block;
    margin: 20px auto;
    padding: 0;
    background: transparent;
    border: 0;
  }
`

export default props => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            repository
            profileUrl
          }
        }
      }
    `}
    render={data => <Article data={data} {...props} />}
  />
)
