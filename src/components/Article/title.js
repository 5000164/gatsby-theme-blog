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
      <StyledTitle to={slug}>{title}</StyledTitle>
      {date && (
        <Meta>
          <a href={historyLink}>Published {formattedDate}</a> by{" "}
          <a href={data.site.siteMetadata.profileUrl}>Hiroshi Sugawara</a>
        </Meta>
      )}
    </>
  )
}

const StyledTitle = styled(props => <Link {...props} />)`
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
