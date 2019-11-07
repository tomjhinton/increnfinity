import React from 'react'


import Main from './Main'
import Sidebar from './Sidebar'

const Home = () => {
  return(
    <section className="section">
      <div className='title'>INCRENFINITY</div>
      <div className="container">
        <div className="columns">
          <div className="column is-one-quarter">
            <Sidebar />
          </div>
          <div className="column">
            <Main />
          </div>
        </div>
      </div>
    </section>
  )
}


export default Home
