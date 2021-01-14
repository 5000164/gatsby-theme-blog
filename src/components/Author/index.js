import React from "react"
import { graphql, StaticQuery } from "gatsby"
import styled from "styled-components"
import PropTypes from "prop-types"

const Author = ({ data }) => {
  return (
    <>
      <Title>Author</Title>
      <Avatar src={"https://www.gravatar.com/avatar/9512465540830de4b91ac3931f1ddfb5"} />
      <Name>{data.site.siteMetadata.name}</Name>
      <Profile>{data.site.siteMetadata.profile}</Profile>
    </>
  )
}

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 600px;
  margin: 120px auto 20px;
  text-align: center;
  @media (max-width: 1140px) {
    width: 75%;
  }

  &::before,
  &::after {
    content: "";
    flex-grow: 1;
    height: 1px;
    background: hsl(235, 10%, 80%);
  }

  &::before {
    margin-right: 1rem;
  }

  &::after {
    margin-left: 1rem;
  }
`

const Avatar = styled.img`
  display: block;
  width: 80px;
  height: 80px;
  margin: 20px auto 8px;
  border-radius: 50%;
`

const Name = styled.div`
  width: 600px;
  margin: 8px auto 20px;
  font-size: 1.6rem;
  text-align: center;
  @media (max-width: 1140px) {
    width: 75%;
  }
`

const Profile = styled.div`
  width: 600px;
  margin: 20px auto;
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
