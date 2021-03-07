import React from "react"
import { graphql, Link, StaticQuery } from "gatsby"
import styled from "styled-components"
import moment from "moment"
import { GatsbyImage } from "gatsby-plugin-image"
import { theme } from "../../../theme"

const Article = ({ data, slug, title, published, updated, content, featuredImage }) => {
  const formatter = (date) => moment(date, "YYYY-MM-DD HH:mm:ss Z").local().format("MMMM Do, YYYY")
  const historyLink = data.site.siteMetadata.repository + "/commits/master/src/posts" + slug.slice(0, -1) + ".md"

  return (
    <>
      <Wrapper>
        {featuredImage && (
          <>
            <GatsbyImage
              image={featuredImage.childImageSharp.gatsbyImageData}
              alt="Blurred Featured Image"
              style={{ filter: "blur(80px)", opacity: ".5" }}
            />
            <GatsbyImage
              image={featuredImage.childImageSharp.gatsbyImageData}
              alt="Featured Image"
              imgClassName="featured-image"
            />
          </>
        )}
        <StyledTitle>{title}</StyledTitle>
        <Date>
          Published <StyledLink to={slug}>{formatter(published)}</StyledLink>
        </Date>
        {published !== updated && (
          <Date>
            Updated <StyledA href={historyLink}>{formatter(updated)}</StyledA>
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
  height: 100%;

  .gatsby-image-wrapper {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    margin: 0 auto;
  }

  .featured-image {
    object-fit: contain !important;
    @media (max-width: 1140px) {
      object-fit: cover !important;
    }
  }
`

const StyledTitle = styled.div`
  max-width: 1140px;
  margin: -120px auto 0;
  padding: 8px 16px;
  font-size: 4.8rem;
  text-align: center;
  letter-spacing: -0.1rem;
  line-height: 1.3;
  background: ${theme.titleBackgroundColor};
  backdrop-filter: blur(2px);
  @media (max-width: 1140px) {
    width: 95%;
    font-size: 3.2rem;
  }
`

const Date = styled.div`
  max-width: 1140px;
  margin: 8px auto 0;
  padding: 8px 16px;
  font-size: 1.2rem;
  text-align: center;
  background: ${theme.titleBackgroundColor};
  @media (max-width: 1140px) {
    width: 95%;
  }
`

const StyledLink = styled(Link)`
  color: ${theme.color};
`

const StyledA = styled.a`
  color: ${theme.color};
`

const StyledArticle = styled.article`
  position: relative;
  margin-top: -80px;

  &::before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: -1;
    width: min(1140px, calc(100% - 32px));
    height: 120px;
    margin: -40px auto 0;
    background: ${theme.backgroundColor};
  }

  & > :first-child {
    margin-top: 0;
  }

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

  .gatsby-highlight {
    margin: 40px auto;
  }

  pre {
    display: flex;
    width: 1140px;
    margin: 0 auto;
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
    color: ${theme.color};
    background-color: ${theme.backgroundColor};
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
