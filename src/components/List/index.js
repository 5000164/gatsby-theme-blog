import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import moment from "moment"

const List = ({ posts }) => {
  const formatter = date =>
    moment(date, "YYYY-MM-DD HH:mm:ss Z")
      .local()
      .format("MMMM Do, YYYY")

  return (
    <>
      {posts.map(({ node }) => (
        <Link to={node.fields.slug} key={node.fields.slug}>
          <Title>{node.frontmatter.title}</Title>
          <Date>{formatter(node.frontmatter.date)}</Date>
        </Link>
      ))}
    </>
  )
}

const Title = styled.div`
  display: block;
  width: 1140px;
  margin: 60px auto 10px;
  font-size: 3rem;
  text-align: center;
  letter-spacing: -0.1rem;
  text-decoration: none;
  color: hsl(235, 10%, 5%);
  :visited {
    color: hsl(235, 10%, 5%);
  }
  @media (max-width: 800px) {
    width: 95%;
  }
`

const Date = styled.div`
  display: block;
  width: 1140px;
  margin: 10px auto;
  font-size: 1.5rem;
  text-align: center;
  letter-spacing: -0.05rem;
  text-decoration: none;
  color: hsl(235, 10%, 5%);
  :visited {
    color: hsl(235, 10%, 5%);
  }
  @media (max-width: 800px) {
    width: 95%;
  }
`

export default List
