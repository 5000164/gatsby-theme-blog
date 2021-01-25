import React from "react"
import { graphql, StaticQuery } from "gatsby"
import PropTypes from "prop-types"
import styled, { createGlobalStyle } from "styled-components"
import CookieConsent from "react-cookie-consent"
import ReactGA from "react-ga"
import Footer from "../Footer"

const GlobalStyle = createGlobalStyle`
  html {
    width: 100%;
    height: 100%;
    margin: 0;
    font-family: serif;
    font-weight: lighter;
    font-size: ${(props) => (props.lang === "ja" ? "10px" : "12px")};
    font-kerning: normal; // フォントのカーニングを常に有効にする
    font-feature-settings: "palt"; // 自動カーニングさせる
    letter-spacing: 0.03rem; // 字間を調整
    -webkit-font-smoothing: antialiased; // フォントにアンチエイリアスをかける (少し細く見える)
    -moz-osx-font-smoothing: grayscale;
    overflow-wrap: break-word;
  }

  body {
    width: 100%;
    height: 100%;
    margin: 0;
    font-size: 1.8rem;
    line-height: 1.55;
    color: hsl(235, 10%, 28%);
    background-color: hsl(0, 100%, 100%);
  }

  @media (max-width: 1140px) {
    body {
      line-height: 1.9; // スマホでは行間を少し広くする
    }
  }

  a {
    color: hsl(235, 10%, 50%);
  }

  a:visited {
    color: hsl(235, 10%, 50%);
  }

  * {
    box-sizing: border-box;
  }
`

const Layout = ({ children, location, data }) => {
  const { lang, consent, trackingId, anonymize } = data.site.siteMetadata

  return (
    <>
      <GlobalStyle lang={lang} />
      {children}
      <Footer />
      <CookieConsentWrapper>
        <CookieConsent
          cookieName="gatsby-gdpr-google-analytics"
          buttonText={consent.accept}
          declineButtonText={consent.decline}
          enableDeclineButton={true}
          disableStyles={true}
          containerClasses="container"
          contentClasses="content"
          declineButtonClasses="declineButton"
          buttonClasses="button"
          onAccept={() => {
            ReactGA.initialize(trackingId)
            ReactGA.set({
              page: location.pathname,
              anonymizeIp: anonymize,
            })
            ReactGA.pageview(location.pathname)
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: consent.text }} />
        </CookieConsent>
      </CookieConsentWrapper>
    </>
  )
}

const CookieConsentWrapper = styled.div`
  .container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    font-size: 1.2rem;
    color: hsl(235, 10%, 28%);
    background-color: hsl(0, 100%, 100%);
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
  }

  .content {
    width: 940px;
    margin: 20px 0;
  }

  @media (max-width: 1140px) {
    .content {
      width: 95%;
      margin: 20px 0 10px;
    }
  }

  .declineButton {
    width: 80px;
    margin: 20px 0 20px 20px;
  }

  @media (max-width: 1140px) {
    .declineButton {
      width: 50%;
      margin: 10px 0 20px;
    }
  }

  .button {
    width: 80px;
    margin: 20px 0 20px 20px;
  }

  @media (max-width: 1140px) {
    .button {
      width: 50%;
      margin: 10px 0 20px;
    }
  }
`

export default (props) => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            lang
            consent {
              text
              accept
              decline
            }
            trackingId
            anonymize
          }
        }
      }
    `}
    render={(data) => <Layout data={data} {...props} />}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        lang: PropTypes.string.isRequired,
        consent: PropTypes.shape({
          text: PropTypes.string.isRequired,
          accept: PropTypes.string.isRequired,
          decline: PropTypes.string.isRequired,
        }).isRequired,
        trackingId: PropTypes.string.isRequired,
        anonymize: PropTypes.bool.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
}
