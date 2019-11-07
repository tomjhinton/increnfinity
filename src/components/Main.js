import React from 'react'
import {Resources, Buildings, Upgrades,  resourceCreator} from './Resources'
import {stuff} from './Sidebar'


export const resourcesArr = []


class Main extends React.Component {


  constructor(props) {
    super(props)
    this.state = {
      modalState: false
    }

    this.toggleModal = this.toggleModal.bind(this)



    this.resourceCreator = this.resourceCreator.bind(this)
    this.resourceA = this.resourceA.bind(this)
    this.buyBuilding = this.buyBuilding.bind(this)
    this.newResource = this.newResource.bind(this)

  }


  update(){
    Resources.resourceB += Buildings.buildingA
    resourcesArr.map(x=> x.collected += x.name*x.amount)
    resourcesArr.map(x=> {
      if(x.collected > x.id*100){
        x.canCreate = true
      }
    })


  }


  componentDidMount() {

    this.interval = setInterval(() => {
      this.setState({ time: 1 })
      this.update()
    }, 100)

  }



  resourceCreator(name, building) {
    this.name = resourcesArr.length +1
    this.canCreate = false
    this.created = false
    this.upgradeLevel = 0
    this.upgradeA = false
    this.upgradeB = false
    this.upgradeC = false
    this.upgradeD = false
    this.upgradeE = false
    this.upgradeF = false
    this.upgradeG = false
    this.amount = 1
    this.building = new Date().getTime()
    this.id = resourcesArr.length +1
    this.collected = 0
    resourcesArr.push(this)


  }

  buyBuilding(e){
    console.log(e.target)
    if(resourcesArr[e.target.id-1].collected > resourcesArr[e.target.id-1].id*(resourcesArr[e.target.id-1].amount*10)) {
      resourcesArr[e.target.id-1].collected -= resourcesArr[e.target.id-1].id*(resourcesArr[e.target.id-1].amount*10)
      resourcesArr[e.target.id-1].amount++

    }
    console.log(  resourcesArr[e.target.id-1].amount)
    console.log(resourcesArr[e.target.id-1].collected)
  }

  newResource(e){
    resourcesArr[e.target.id-1].created = true
    new this.resourceCreator()
    console.log('hiya')
  }


  handleSubmit(event) {

    event.preventDefault()
  }



  resourceA(){
    Resources.resourceA ++
    new this.resourceCreator()
    //console.log(resourcesArr)
    //console.log(this)

  }


  addBuildingA(){

    if(Resources.resourceA > 20){
      Buildings.buildingA ++
      Resources.resourceA -=20

    }


  }


  toggleModal(){
    this.setState((prev, props) => {
      const newState = !prev.modalState;

      return { modalState: newState };
    })
  }

  render(){
    return(

      <div className="container">
        <div className="columns parent">

          <div className="resources" onClick={this.resourceA}>

            resourceA
          </div>
          {stuff.resourceB &&<div className="resources" onClick={this.addBuildingA}>

            BuildingA{Resources.BuildingA}
          </div>}
          {stuff.resourceC &&<div className="resources" onClick={this.addBuildingB}>

            resourceA
          </div>}
          {resourcesArr &&
            resourcesArr.map(x => {
              return <div key={x.id} className='resources columns'>
                <div  className ='column'>
                  {x.name}
                </div>
                <div className ='column' onClick={this.buyBuilding} id={x.id}>
                  {x.amount}
                </div>
                {x.canCreate && !x.created && <div className='column'  id={x.id} onClick={this.toggleModal}>
               NEW
                  <div className="modal">
                    <div className="modal-background"></div>
                    <div className="modal-content">
                      <form onSubmit={this.handleSubmit}>
                        <input type="text" name="resource" />
                        <input type="text" name="createdBy" />

                      </form>
                    </div>
                    <button className="modal-close is-large" aria-label="close" onClick={this.toggleModal}></button>
                  </div>
                </div>}
              </div>
            })}
        </div>
      </div>
    )
  }
}



export default Main
