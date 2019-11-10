import React from 'react'
export const resourcesArr = []





class Main extends React.Component {


  constructor(props) {
    super(props)
    this.state = {
      modalState: true,
      total: 0,
      upgrades: false,
      multiplier: 1,
      multiplyCost: 2


    }

    this.toggleModal =  this.toggleModal.bind(this)
    this.resourceCreator = this.resourceCreator.bind(this)
    this.buyBuilding = this.buyBuilding.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.newButton = this.newButton.bind(this)
    this.upgrade = this.upgrade.bind(this)
    this.unlockUpgrades = this.unlockUpgrades.bind(this)
    this.multiply = this.multiply.bind(this)


  }



  componentDidMount() {

    this.interval = setInterval(() => {
      this.setState({ ...this.state,time: 1 })
      this.update()
    }, 100)

  }

  formatCash(n) {
    if (n < 1e3) return n
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + 'K'
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + 'M'
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + 'B'
    if (n >= 1e12) return +(n / 1e12).toFixed(1) + 'T'
  }

  update(){
    let total = resourcesArr.map(x => x = x.collected*x.id)
    total = total.reduce((a,b)=> a+b,0)
    resourcesArr.map(x=> x.collected += ((1/x.id)*x.amount)*x.upgradeLevel)
    resourcesArr.map(x=> {
      if(x.collected > x.id*100){
        x.canCreate = true
      }
      if(x.collected < x.id*100){
        x.canCreate = false
      }
    })

    this.setState({...this.state, total: {total} })
  }

  resourceCreator(name, building) {
    this.resource = name
    this.canCreate = false
    this.created = false
    this.upgradeLevel = 1
    this.amount = 1
    this.building = building
    this.id = resourcesArr.length +1
    this.collected = 0
    resourcesArr.push(this)


  }

  buyBuilding(e){
    const  select = resourcesArr[e.target.id-1]
    if(select.collected > (select.id +1)*(select.amount*10)) {
      select.collected -= (select.id +1)*(select.amount*10)
      select.amount++

    }

  }

  upgrade(e){
    const  select = resourcesArr[e.target.id-1]
    if(select.collected > select.id*(select.amount*100)*(select.upgradeLevel)) {
      select.collected -= select.id*(select.amount*100*(select.upgradeLevel))
      select.upgradeLevel +=0.1

    }

  }


  handleSubmit(event) {

    new this.resourceCreator(this.state.resource, this.state.createdBy)
    this.toggleModal()
    event.preventDefault()
  }


  handleChange(event) {
    this.setState({...this.state, [event.target.name]: event.target.value})
    console.log(this.state)
  }



  unlockUpgrades(){
    if(this.state.total.total > 50000){
      this.setState({...this.state, upgrades: true})
      resourcesArr.map(x=> x.collected = 0)
    }
  }



  toggleModal(){

    this.setState((prev) => {
      const newState = !prev.modalState

      return { modalState: newState }
    })
  }

  newButton(e){

    resourcesArr[e.target.id-1].created = true
    this.toggleModal()

  }

  multiply(){
    const cost =  Math.pow(this.state.multiplier, this.state.multiplyCost)
    console.log(cost)
    if  (this.state.total.total > 500000* cost){
      this.setState({...this.state, multiplier: this.state.multiplier+0.1, multiplyCost: this.state.multiplyCost+1 })
      resourcesArr.map(x=> x.collected = 0)

    }
  }


  render(){
    return(

      <div className="container">
        {this.state.total && <h1 className='total'>Total: {this.formatCash(this.state.total.total.toFixed(1))}</h1>}

        {this.state.upgrades === false && resourcesArr.length> 5 && <h2 className='unlockUp' onClick={this.unlockUpgrades}    style={{background: `linear-gradient(180deg, rgba(255,255,266,1) ${(this.state.total.total/50000)*100}%, rgba(244,0,0,0.6292892156862745) 100%)`}}  >UNLOCK UPGRADES </h2>}

        {this.state.total.total > 500000*Math.pow(this.state.multiplier, this.state.multiplyCost) && <h2 className='multiplier' onClick={this.multiply} >INVEST</h2>}

        <hr/>

        <div className="columns parent main">


          {resourcesArr &&
            resourcesArr.map(x => {
              return <div key={x.id} className='resourcesM columns'>
                <div  className ='column bname'>
                  {x.building}
                </div>
                <div className ='column buy' onClick={this.buyBuilding} id={x.id}
                  style={{background: `linear-gradient(180deg, rgba(255,255,266,1) ${x.collected/((x.id +1)*(x.amount*10))*100}%, rgba(244,0,0,0.6292892156862745) 100%)`}}
                >
                  {x.amount}
                </div>
                {x.canCreate && !x.created && <div className='column'  id={x.id} onClick={this.newButton}>
               NEW
                </div>}
                {this.state.upgrades && <div className='column upgrade'  id={x.id} onClick={this.upgrade}   style={{background: `linear-gradient(180deg, rgba(255,255,266,1) ${x.collected/(x.id*(x.amount*10)*(x.upgradeLevel*10))*100}%, rgba(244,0,0,0.6292892156862745) 100%)`}}>
                &#8682; {x.upgradeLevel.toFixed(1)}
                </div>}

              </div>
            })}
          {this.state.modalState ===  true  &&  <div className="modal is-active">
            <div className="modal-background"></div>
            <div className="modal-content">
              <form onSubmit={this.handleSubmit}>
                <div className='title'>
                Add a resource to collect and something to produce it ...
                </div>
                <input type="text" name="resource"  onChange={this.handleChange} placeholder='RESOURCE' maxLength="15" />
                <input type="text" name="createdBy" onChange={this.handleChange} placeholder='CREATED BY' maxLength="15"/>
                <div className="button" onClick={this.handleSubmit}>&#10003;</div>
              </form>
            </div>
          </div>}
        </div>
      </div>
    )
  }
}



export default Main
