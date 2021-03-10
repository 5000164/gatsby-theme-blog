import React from "react"
import { graphql, StaticQuery } from "gatsby"
import PropTypes from "prop-types"
import { createGlobalStyle } from "styled-components"
import { theme } from "../../../theme"
import Header from "../Header"
import Footer from "../Footer"

const Layout = ({
  children,
  data: {
    site: { siteMetadata: lang },
  },
}) => (
  <>
    <Header />
    <GlobalStyle lang={lang} />
    {children}
    <Footer />
  </>
)

const GlobalStyle = createGlobalStyle`
  html {
    width: 100%;
    height: 100%;
    margin: 0;
    font-family: sans-serif;
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
    color: ${theme.color};
    background-color: ${theme.backgroundColor};
  }

  #___gatsby, #gatsby-focus-wrapper {
    height: 100%;
  }

  @media (max-width: 1140px) {
    body {
      line-height: 1.9; // スマホでは行間を少し広くする
    }
  }

  a {
    color: ${theme.linkColor};
  }

  a:visited {
    color: ${theme.linkColor};
  }

  * {
    box-sizing: border-box;
  }
`

export default (props) => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            lang
          }
        }
      }
    `}
    render={(data) => <Layout data={data} {...props} />}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        lang: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
}
