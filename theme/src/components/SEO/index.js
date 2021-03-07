import React from "react"
import { Helmet } from "react-helmet"
import PropTypes from "prop-types"
import { graphql, StaticQuery } from "gatsby"
import Facebook from "./Facebook"
import Twitter from "./Twitter"

const SEO = ({ title, description, featuredImage, slug, article }) => (
  <StaticQuery
    query={query}
    render={({
      site: {
        siteMetadata: { lang, siteUrl, image, twitterUsername },
      },
    }) => {
      const seo = {
        lang,
        title,
        description,
        image: featuredImage ? `${siteUrl}${featuredImage.childImageSharp.gatsbyImageData}` : `${siteUrl}${image}`,
        url: `${siteUrl}${slug || "/"}`,
      }

      return (
        <>
          <Helmet>
            <html lang={seo.lang} />
            <meta charSet="utf-8" />
            <title>{seo.title}</title>
            <meta name="description" content={seo.description} />
            <meta name="image" content={seo.image} />
          </Helmet>
          <Facebook
            pageUrl={seo.url}
            type={article ? "article" : null}
            title={seo.title}
            description={seo.description}
            image={seo.image}
          />
          <Twitter username={twitterUsername} title={seo.title} description={seo.description} image={seo.image} />
        </>
      )
    }}
  />
)

export default SEO

SEO.propTypes = {
  lang: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  featuredImage: PropTypes.object,
  slug: PropTypes.string,
  article: PropTypes.bool,
}

SEO.defaultProps = {
  lang: null,
  title: null,
  description: null,
  featuredImage: null,
  pathname: null,
  article: false,
}

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        lang
        siteUrl
        image
        twitterUsername
      }
    }
  }
`
