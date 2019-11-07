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

    this.trade =  this.trade.bind(this)

  }





  componentDidMount() {

    this.interval = setInterval(() => {
      this.setState({ time: 1 })

    }, 100)

  }


  formatCash(n) {
    if (n < 1e3) return n
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + 'K'
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + 'M'
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + 'B'
    if (n >= 1e12) return +(n / 1e12).toFixed(1) + 'T'
  }

  trade(e){
    if(resourcesArr.length>e.target.id){
      resourcesArr[e.target.id].collected +=  resourcesArr[e.target.id-1].collected/20
      resourcesArr[e.target.id-1].collected = 0
    }
  }


  render() {



    return(
      <div className='sidebar'>
        {resourcesArr &&
          resourcesArr.map(x => {
            return <div key={x.id} className='resources sidebarR columns'>
              <div className='column'onClick={this.trade} id={x.id}>
                &#8650;
              </div>
              <div className='column'>
                {x.resource}: {this.formatCash(x.collected.toFixed(1))}
              </div>
            </div>
          })}
      </div>
    )
  }
}

export default Sidebar
