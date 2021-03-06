import * as React from 'react'
import { Link } from 'gatsby'
import Root from '~/components/Root'

const NotFoundPage = () => (
  <Root>
    <h1>404: Page not found.</h1>
    <p>
      You've hit the void. <Link to="/">Go back.</Link>
    </p>
  </Root>
)

export default NotFoundPage
