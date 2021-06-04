import React from "react"
import { graphql, StaticQuery } from "gatsby"
import PropTypes from "prop-types"
import { createGlobalStyle } from "styled-components"
import { theme } from "../../../theme"

const Layout = ({
  children,
  data: {
    site: {
      siteMetadata: { lang },
    },
  },
}) => (
  <>
    <GlobalStyle lang={lang} />
    {children}
  </>
)

const GlobalStyle = createGlobalStyle`
  html {
    font-family: sans-serif;
    font-size: ${(props) => (props.lang === "ja" ? "16px" : "18px")};
    font-kerning: normal; // フォントのカーニングを常に有効にする
    font-feature-settings: "palt"; // 自動カーニングさせる
    letter-spacing: 0.03rem; // 字間を調整
    line-height: 1.55;
    -webkit-font-smoothing: antialiased; // フォントにアンチエイリアスをかける (少し細く見える)
    -moz-osx-font-smoothing: grayscale;
    overflow-wrap: break-word;
    color: ${theme.color};
    background-color: ${theme.backgroundColor};
  }

  body {
    margin: 0;
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
