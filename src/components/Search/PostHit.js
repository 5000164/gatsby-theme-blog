import React from "react"
import { Highlight, Snippet } from "react-instantsearch-dom"
import { Link } from "gatsby"
import styled from "styled-components"

const PostHit = () => ({ hit }) => (
  <Article>
    <Title>
      <Link to={hit.slug}>
        <Highlight attribute="title" hit={hit} tagName="mark" />
      </Link>
    </Title>
    <Content>
      <Snippet attribute="excerpt" hit={hit} tagName="mark" />
    </Content>
  </Article>
)

const Article = styled.div`
  margin: 40px auto;
  text-align: center;
`

const Title = styled.div`
  width: 580px;
  margin: 4px auto;
`

const Content = styled.div`
  width: 580px;
  margin: 4px auto;
`

export default PostHit
