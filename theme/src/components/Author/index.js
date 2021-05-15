import React from "react"
import { graphql, StaticQuery } from "gatsby"
import PropTypes from "prop-types"
import styled from "styled-components"
import { Rss } from "styled-icons/boxicons-regular"

const Author = ({ data }) => {
  return (
    <>
      <Avatar src={"https://www.gravatar.com/avatar/9512465540830de4b91ac3931f1ddfb5"} />
      <Name>{data.site.siteMetadata.name}</Name>
      <Profile>{data.site.siteMetadata.profile}</Profile>
      <About>
        <li>
          <a href={data.site.siteMetadata.profileUrl}>About me</a>
        </li>
        <li>
          <a href="https://github.com/5000164">GitHub</a>
        </li>
        <li>
          <a href="https://twitter.com/5000164">Twitter</a>
        </li>
      </About>
      <RssLink href={data.site.siteMetadata.siteUrl + "/feed.xml"}>
        <StyledRss />
      </RssLink>
    </>
  )
}

const Avatar = styled.img`
  display: block;
  width: 80px;
  height: 80px;
  margin: 16px auto 0;
  border-radius: 50%;
`

const Name = styled.div`
  width: min(600px, 90%);
  margin: 8px auto 0;
  text-align: center;
`

const Profile = styled.div`
  width: min(600px, 90%);
  margin: 8px auto 0;
  text-align: center;
`

const About = styled.ul`
  width: min(600px, 90%);
  margin: 8px auto 0;
  padding: 0;
  text-align: center;
  list-style-type: none;
`

const RssLink = styled.a`
  display: block;
  width: min(600px, 90%);
  margin: 8px auto 0;
  text-align: center;
`

const StyledRss = styled(Rss)`
  width: calc(1em + 4px);
`

export default (props) => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            siteUrl
            name
            profile
            profileUrl
          }
        }
      }
    `}
    render={(data) => <Author data={data} {...props} />}
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
