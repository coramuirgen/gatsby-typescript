import * as React from 'react'
import { Link } from 'gatsby'
import Root from '~/components/Root'

const IndexPage = () => (
  <Root>
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <Link to="/page-2/">Go to page 2</Link>
  </Root>
)

export default IndexPage
