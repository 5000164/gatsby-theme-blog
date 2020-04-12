const currentEnvironment = process.env.ENV || process.env.NODE_ENV || "development"
const queries =
  currentEnvironment !== "algolia"
    ? []
    : (() => {
        const postQuery = `{
  posts: allMarkdownRemark(
    filter: { fileAbsolutePath: { regex: "/posts/" } }
  ) {
    edges {
      node {
        objectID: id
        fields {
          slug
        }
        frontmatter {
          title
          published
          updated
        }
        excerpt(pruneLength: 3000)
      }
    }
  }
}`

        const flatten = arr =>
          arr.map(({ node: { fields, frontmatter, ...rest } }) => ({
            ...fields,
            ...frontmatter,
            ...rest,
          }))
        const settings = { attributesToSnippet: [`excerpt:20`] }

        return [
          {
            query: postQuery,
            transformer: ({ data }) => flatten(data.posts.edges),
            indexName: `Posts`,
            settings,
          },
        ]
      })()

module.exports = queries
