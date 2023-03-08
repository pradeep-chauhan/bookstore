import * as React from 'react'
import * as ReactDom from 'react-dom'

const Home = () => {
  return (
    <div className='container'>
      <h1>Hello, React with Rails 7 Using esbuild</h1>
    </div>
  )
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDom.render(<Home />, document.getElementById('root'))
})

export default Home