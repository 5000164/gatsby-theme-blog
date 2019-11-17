import styled from "styled-components"
import Title from "./title"
import React from "react"

const Article = ({ slug, title, date, content }) => (
  <>
    <Title slug={slug} title={title} date={date} />
    <StyledArticle dangerouslySetInnerHTML={{ __html: content }} />
  </>
)

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
  p:first-child {
    margin-top: 0;
  }
  p:last-child {
    margin-bottom: 0;
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
  img {
    display: block;
    width: 1140px;
    margin: 0 auto;
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

export default Article
