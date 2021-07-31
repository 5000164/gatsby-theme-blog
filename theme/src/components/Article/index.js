import React from "react"
import { graphql, Link, StaticQuery } from "gatsby"
import styled from "styled-components"
import moment from "moment"
import { theme } from "../../../theme"

const Article = ({ data, slug, title, published, updated, content, featuredImage }) => {
  const formatter = (date) => moment(date, "YYYY-MM-DD HH:mm:ss Z").local().format("MMMM Do, YYYY")
  const historyLink = data.site.siteMetadata.repository + "/commits/master/src/posts" + slug.slice(0, -1) + ".md"

  return (
    <>
      <StyledTitle>{title}</StyledTitle>
      <Date>
        <StyledLink to={slug}>{formatter(published)}</StyledLink>
      </Date>
      {published !== updated && (
        <Date>
          <StyledA href={historyLink}>{formatter(updated)}</StyledA>
        </Date>
      )}
      <StyledArticle dangerouslySetInnerHTML={{ __html: content }} />
    </>
  )
}

const StyledTitle = styled.div`
  width: min(600px, 90%);
  margin: 40px auto 0;
  padding: 0;
  font-size: 2rem;
  letter-spacing: -0.1rem;
  line-height: 1.3;
`

const Date = styled.div`
  width: min(600px, 90%);
  margin: 8px auto 0;
  padding: 0;
  font-size: 0.8rem;
`

const StyledLink = styled(Link)`
  color: ${theme.color};

  :visited {
    color: ${theme.color};
  }
`

const StyledA = styled.a`
  color: ${theme.color};

  :visited {
    color: ${theme.color};
  }
`

const StyledArticle = styled.article`
  margin-bottom: 160px;

  & > :first-child {
    margin-top: 40px;
  }

  p {
    width: min(600px, 90%);
    margin: 8px auto 0;
  }

  h1 {
    width: min(600px, 90%);
    margin: 40px auto 0;
    padding: 0;
    font-weight: normal;
    font-size: 2rem;
    letter-spacing: -0.1rem;
    line-height: 1.3;
  }

  h2 {
    width: min(600px, 90%);
    margin: 40px auto 0;
    padding: 0;
    font-weight: normal;
    font-size: 1.6rem;
    letter-spacing: -0.1rem;
    line-height: 1.3;
  }

  h1 + h2 {
    margin-top: 20px;
  }

  > ul,
  > ol {
    width: min(600px, 90%);
    margin: 8px auto 0;
    padding-left: 20px;
  }

  > ul p,
  > ol p {
    width: auto;
    margin-top: 0;
    margin-bottom: 0;
  }

  figure {
    width: min(600px, 90%);
    margin: 8px auto 0;
  }

  figcaption {
    width: min(600px, 90%);
    margin: 8px auto 0;
    text-align: center;
  }

  blockquote {
    margin: 0;

    & > p {
      position: relative;
      padding-left: 20px;
    }

    & > p::before {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      left: 4px;
      width: 6px;
      height: 100%;
      background: #e3e4e6;
      border-radius: 8px;
    }
  }

  .gatsby-highlight {
    margin: 8px auto 0;
  }

  pre {
    display: flex;
    width: min(600px, 90%);
    margin: 0 auto;
    padding: 0;
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
    width: min(600px, 90%);
    margin: 40px auto 0;
    padding: 0;
  }

  .footnotes > ol {
    width: 100%;
    padding-left: 20px;
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
