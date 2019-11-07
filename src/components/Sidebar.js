import React from 'react'


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





  componentDidMount() {

    this.interval = setInterval(() => {
      this.setState({ time: 1 })

    }, 100)

  }







  render() {



    return(
      <div>
        {resourcesArr &&
          resourcesArr.map(x => {
            return <div key={x.id} className='resources'>
              {x.resource}: {x.collected}
            </div>
          })}
      </div>
    )
  }
}

export default Sidebar
