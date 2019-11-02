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
    width: 720px;
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
    width: 720px;
    margin: 60px auto 20px;
    padding: 0 0 15px 0;
    font-size: 2.4rem;
    font-weight: bold;
    border-bottom: 1px solid hsl(235, 10%, 30%);
  }
  @media (max-width: 800px) {
    h1 {
      width: 75%;
    }
  }
  h2 {
    width: 720px;
    margin: 60px auto 20px;
    padding: 0;
    font-size: 2rem;
    font-weight: bold;
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
  ul,
  ol {
    width: 700px;
    margin: auto;
    padding-left: 20px;
  }
  @media (max-width: 800px) {
    ul,
    ol {
      width: 70%;
      padding-left: 5%;
    }
  }
  ul p,
  ol p {
    margin-top: 0;
    margin-bottom: 0;
  }
  img {
    display: block;
    max-width: 720px;
    margin: 0 auto;
  }
  @media (max-width: 800px) {
    img {
      max-width: 75%;
    }
  }
  blockquote {
    width: 720px;
    margin: 20px auto;
  }
  @media (max-width: 800px) {
    blockquote {
      width: 75%;
    }
  }
  blockquote > p {
    position: relative;
    width: 700px;
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
    width: 100%;
    margin: 40px 0;
    padding: 1em 0;
  }
  pre > code {
    min-width: 720px;
  }
  @media (max-width: 800px) {
    pre > code {
      min-width: 75%;
      max-width: 75%;
    }
  }
`

export default Article
