import React from "react"
import { graphql, Link, StaticQuery } from "gatsby"
import styled from "styled-components"
import moment from "moment"

const Title = ({ data, slug, title, date }) => {
  const historyLink = data.site.siteMetadata.repository + "/commits/master/src/posts" + slug.slice(0, -1) + ".md"
  const formattedDate = moment(date, "YYYY-MM-DD HH:mm:ss Z")
    .local()
    .format("MMMM Do, YYYY")
  return (
    <>
      <StyledTitle>{title}</StyledTitle>
      {date && (
        <Meta>
          <Slug to={slug}>Published {formattedDate}</Slug>
          <History href={historyLink}>History</History>
          <Author href={data.site.siteMetadata.profileUrl}>Hiroshi Sugawara</Author>
        </Meta>
      )}
    </>
  )
}

const StyledTitle = styled.div`
  display: block;
  width: 1140px;
  margin: 220px auto 1rem;
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
  @media (max-width: 800px) {
    width: 95%;
    margin: 120px auto 1rem;
    font-size: 3.2rem;
  }
`

const Meta = styled.div`
  width: 600px;
  margin: 1rem auto 260px;
  font-size: 1.2rem;
  text-align: center;
  @media (max-width: 800px) {
    width: 95%;
    margin: 1rem auto 140px;
  }
`

const Slug = styled(Link)`
  margin: 0.4rem;
`

const History = styled.a`
  margin: 0.4rem;
`
const Author = styled.a`
  margin: 0.4rem;
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
    render={data => <Title data={data} {...props} />}
  />
)
