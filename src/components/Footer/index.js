import React from "react"
import PropTypes from "prop-types"
import { graphql, Link, StaticQuery } from "gatsby"
import styled from "styled-components"
import { Rss } from "styled-icons/boxicons-regular"
import Search from "../Search"

const Footer = ({ data }) => (
  <StyledFooter>
    <StyledTitle to="/">{data.site.siteMetadata.title}</StyledTitle>
    <Subtitle>My writing is my life.</Subtitle>
    <SearchWrapper>
      <Search />
    </SearchWrapper>
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
    <Copyright>Copyright © 2021 Hiroshi Sugawara. All rights reserved.</Copyright>
  </StyledFooter>
)

const StyledFooter = styled.footer`
  margin: 240px 0 20px;
`

const StyledTitle = styled((props) => <Link {...props} />)`
  display: block;
  width: 600px;
  margin: auto;
  font-size: 2rem;
  letter-spacing: -0.2rem;
  text-decoration: none;
  @media (max-width: 1140px) {
    width: 75%;
  }
`

const Subtitle = styled.div`
  display: block;
  width: 600px;
  margin: auto;
  font-size: 1.2rem;
  @media (max-width: 1140px) {
    width: 75%;
  }
`

const SearchWrapper = styled.div`
  display: block;
  width: 600px;
  margin: auto;
  @media (max-width: 1140px) {
    width: 75%;
  }
`

const About = styled.ul`
  width: 600px;
  margin: 20px auto;
  padding: 0;
  list-style-type: none;
  @media (max-width: 1140px) {
    width: 75%;
  }
`

const RssLink = styled.a`
  display: block;
  width: 600px;
  margin: 8px auto;
  padding: 0;
  @media (max-width: 1140px) {
    width: 75%;
  }
`

const StyledRss = styled(Rss)`
  width: calc(1em + 4px);
`

const Copyright = styled.div`
  width: 600px;
  margin: 8px auto;
  padding: 0;
  @media (max-width: 1140px) {
    width: 75%;
  }
`

export default (props) => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
            siteUrl
            profileUrl
          }
        }
      }
    `}
    render={(data) => <Footer data={data} {...props} />}
  />
)

Footer.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
        siteUrl: PropTypes.string.isRequired,
        profileUrl: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
}
