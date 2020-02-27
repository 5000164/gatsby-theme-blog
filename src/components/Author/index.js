import React from "react"
import { graphql, StaticQuery } from "gatsby"
import styled from "styled-components"
import PropTypes from "prop-types"

const Author = ({ data }) => {
  return (
    <>
      <Name>{data.site.siteMetadata.name}</Name>
      <Profile>{data.site.siteMetadata.profile}</Profile>
    </>
  )
}

const Name = styled.div`
  width: 360px;
  margin: 240px auto 12px;
  font-size: 1.6rem;
  text-align: center;
  @media (max-width: 1140px) {
    width: 75%;
  }
`

const Profile = styled.div`
  width: 360px;
  margin: 12px auto 240px;
  font-size: 1.6rem;
  text-align: center;
  @media (max-width: 1140px) {
    width: 75%;
  }
`

export default props => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            name
            profile
          }
        }
      }
    `}
    render={data => <Author data={data} {...props} />}
  />
)

Author.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        name: PropTypes.string.isRequired,
        profile: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
}
