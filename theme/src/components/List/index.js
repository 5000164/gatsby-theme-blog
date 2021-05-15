import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import moment from "moment"
import { theme } from "../../../theme"

const List = ({ posts }) => {
  const formatter = (date) => moment(date, "YYYY-MM-DD HH:mm:ss Z").local().format("MMMM Do, YYYY")

  return (
    <>
      {posts.map(
        ({
          node: {
            fields: { slug },
            frontmatter: { title, published },
          },
        }) => (
          <StyledLink to={slug} key={slug}>
            <Title>{title}</Title>
            <Date>{formatter(published)}</Date>
          </StyledLink>
        )
      )}
    </>
  )
}

const StyledLink = styled((props) => <Link {...props} />)`
  display: block;
  width: min(600px, 90%);
  margin: 80px auto;
  text-decoration: none;
`

const Title = styled.div`
  margin: 8px 0 0;
  font-size: 1rem;
  color: ${theme.color};

  :visited {
    color: ${theme.color};
  }
`

const Date = styled.div`
  margin: 8px 0 0;
  font-size: 0.8rem;
  color: ${theme.color};

  :visited {
    color: ${theme.color};
  }
`

export default List
