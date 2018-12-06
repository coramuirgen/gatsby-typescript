'use strict'

/*

Configure Gatsby to create pages from markdown files in ./src/markdownPages

*/

const path = require('path')

const MARKDOWN_PAGE_FOLDER = 'markdownPages'
const MARKDOWN_PAGE_TEMPLATE = './src/components/MarkdownPage/index.tsx'

exports.onCreateNode = ({ node, actions, getNode }) => {
  if (node.internal.type === 'MarkdownRemark') {
    const filePath = `${getNode(node.parent).relativePath.replace('.md', '')}/`

    actions.createNodeField({
      node,
      name: 'filePath',
      value: filePath || ''
    })

    actions.createNodeField({
      node,
      name: 'isPage',
      value: filePath.startsWith(MARKDOWN_PAGE_FOLDER)
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const allMarkdown = await graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            fields {
              isPage
              filePath
            }
          }
        }
      }
    }
  `)

  if (allMarkdown.errors) {
    console.error(allMarkdown.errors)
    throw new Error(allMarkdown.errors)
  }

  allMarkdown.data.allMarkdownRemark.edges
    .filter(({ node }) => !!node.fields.isPage)
    .forEach(({ node }) => {
      const { filePath } = node.fields

      createPage({
        path: filePath.replace(`${MARKDOWN_PAGE_FOLDER}/`, ''),
        component: path.resolve(MARKDOWN_PAGE_TEMPLATE),
        context: {
          // Data passed to context is available in page queries as GraphQL
          // variables.
          filePath
        }
      })
    })
}
