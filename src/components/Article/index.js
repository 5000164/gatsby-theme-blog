import React from "react"
import { graphql, Link, StaticQuery } from "gatsby"
import styled from "styled-components"
import moment from "moment"
import Img from "gatsby-image"

const Article = ({ data, slug, title, published, updated, content, featuredImage }) => {
  const formatter = (date) => moment(date, "YYYY-MM-DD HH:mm:ss Z").local().format("MMMM Do, YYYY")
  const historyLink = data.site.siteMetadata.repository + "/commits/master/src/posts" + slug.slice(0, -1) + ".md"

  return (
    <>
      <Wrapper>
        {featuredImage && <Img fluid={featuredImage.childImageSharp.fluid} style={{ position: "absolute" }} />}
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

const Wrapper = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;
  width: 1140px;
  height: 476px;
  margin: 8px auto 40px;
  @media (max-width: 1140px) {
    width: calc(100% - 16px);
    margin: 8px 8px 40px;
  }

  .gatsby-image-wrapper {
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    width: 1140px;
    height: 476px;
    margin: 0 auto;
    @media (max-width: 1140px) {
      width: 100%;
      height: 100%;
    }
  }
`

const StyledTitle = styled.div`
  width: 1140px;
  margin: 8px auto;
  padding: 8px 0 4px;
  font-size: 4.8rem;
  text-align: center;
  letter-spacing: -0.1rem;
  line-height: 1.3;
  color: hsl(235, 10%, 20%);
  background-color: hsl(0, 100%, 100%);
  @media (max-width: 1140px) {
    width: 95%;
    font-size: 3.2rem;
  }
`

const Date = styled.div`
  width: 600px;
  margin: 8px auto;
  padding: 4px 0;
  font-size: 1.2rem;
  text-align: center;
  background-color: hsl(0, 100%, 100%);
  @media (max-width: 1140px) {
    width: 95%;
  }
`

const StyledArticle = styled.article`
  p {
    width: 600px;
    margin: 20px auto;
  }

  @media (max-width: 1140px) {
    p {
      width: 75%;
    }
  }

  h1 {
    width: 600px;
    margin: 120px auto 20px;
    padding: 0;
    font-weight: lighter;
    font-size: 3.2rem;
    letter-spacing: -0.05rem;
    line-height: 1.3;
    color: hsl(235, 10%, 24%);
  }

  @media (max-width: 1140px) {
    h1 {
      width: 75%;
    }
  }

  h2 {
    width: 600px;
    margin: 80px auto 20px;
    padding: 0;
    font-weight: lighter;
    font-size: 2.4rem;
    letter-spacing: -0.01rem;
    line-height: 1.3;
  }

  @media (max-width: 1140px) {
    h2 {
      width: 75%;
    }
  }

  h1 + h2 {
    margin-top: 20px;
  }

  > ul,
  > ol {
    width: 600px;
    margin: auto;
    padding-left: 20px;
  }

  @media (max-width: 1140px) {
    > ul,
    > ol {
      width: 75%;
    }

    > ul > li,
    > ol > li {
      margin-left: -20px;
    }
  }

  > ul p,
  > ol p {
    width: auto;
    margin-top: 0;
    margin-bottom: 0;
  }

  figure {
    width: 1140px;
    margin: 40px auto;
  }

  figcaption {
    width: 1140px;
    margin: 8px auto;
    text-align: center;
  }

  @media (max-width: 1140px) {
    figure {
      width: 100%;
    }

    figcaption {
      width: 100%;
    }
  }

  blockquote {
    width: 600px;
    margin: 20px auto;
  }

  @media (max-width: 1140px) {
    blockquote {
      width: 75%;
    }
  }

  blockquote > p {
    position: relative;
    width: 600px;
    padding-left: 20px;
  }

  @media (max-width: 1140px) {
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
    width: 1140px;
    margin: 40px auto;
    padding: 0;
  }

  @media (max-width: 1140px) {
    pre {
      width: 100%;
    }
  }

  pre > code {
    padding: 12px 20px;
  }

  p > code,
  li > code {
    padding: 0;
    color: hsl(235, 10%, 28%);
    background-color: hsl(0, 100%, 100%);
    overflow-wrap: break-word;
  }

  .footnotes {
    width: 600px;
    margin: 120px auto;
    padding: 0;
  }

  @media (max-width: 1140px) {
    .footnotes {
      width: 75%;
    }
  }

  .footnotes > ol {
    width: 100%;
    padding-left: 20px;
  }

  @media (max-width: 1140px) {
    .footnotes > ol > li {
      margin-left: -20px;
    }
  }

  .footnotes p {
    display: inline;
  }

  .footnote-ref::before {
    content: "[";
  }

  .footnote-ref::after {
    content: "]";
  }

  hr {
    height: 1px;
    background: hsl(235, 10%, 80%);
    border: 0;
  }

  iframe {
    display: block;
    margin: 20px auto;
    padding: 0;
    background: transparent;
    border: 0;
  }
`

export default (props) => (
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
    render={(data) => <Article data={data} {...props} />}
  />
)
