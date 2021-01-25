import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import moment from "moment"
import { theme } from "../../../theme"

const List = ({ posts }) => {
  const formatter = (date) => moment(date, "YYYY-MM-DD HH:mm:ss Z").local().format("MMMM Do, YYYY")

  return (
    <>
      {posts.map(({ node }) => (
        <StyledLink to={node.fields.slug} key={node.fields.slug}>
          <Title>{node.frontmatter.title}</Title>
          <Date>{formatter(node.frontmatter.published)}</Date>
        </StyledLink>
      ))}
    </>
  )
}

const StyledLink = styled((props) => <Link {...props} />)`
  display: block;
  width: 600px;
  margin: 80px auto;
  text-decoration: none;
  @media (max-width: 1140px) {
    width: 95%;
  }
`

const Title = styled.div`
  margin: 4px 0;
  font-size: 2rem;
  color: ${theme.color};

  :visited {
    color: ${theme.color};
  }
`

const Date = styled.div`
  margin: 4px 0;
  font-size: 1.2rem;
  color: ${theme.color};

  :visited {
    color: ${theme.color};
  }
`

export default List
