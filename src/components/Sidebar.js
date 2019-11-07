import React from 'react'

import {Resources} from './Resources'

import{resourcesArr} from './Main'

export const stuff = {
  resourceB: false

}

class Sidebar extends React.Component {


  constructor() {
    super()

    this.state = {
      time: {}

    }



  }



  resourcesCheck(){

    if(Resources.resourceA >= 20){
      stuff.resourceB = true
    }
  }

  componentDidMount() {

    this.interval = setInterval(() => {
      this.setState({ time: 1 })
      this.resourcesCheck()
    }, 100)

  }







  render() {



    return(
      <div>
        <h2>resourceA:{Resources.resourceA}</h2>
        {stuff.resourceB && <h2>resourceB:{Resources.resourceB}</h2>}
        {resourcesArr &&
          resourcesArr.map(x => {
            return <div key={x.id} className='resources'>
              {x.name}: {x.collected}
            </div>
          })}
      </div>
    )
  }
}

export default Sidebar
