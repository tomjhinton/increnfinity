import React from 'react'
export const resourcesArr = []


class Main extends React.Component {


  constructor(props) {
    super(props)
    this.state = {
      modalState: true

    }

    this.toggleModal =  this.toggleModal.bind(this)
    this.resourceCreator = this.resourceCreator.bind(this)
    this.buyBuilding = this.buyBuilding.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.newButton = this.newButton.bind(this)


  }


  update(){
    resourcesArr.map(x=> x.collected += x.id*x.amount)
    resourcesArr.map(x=> {
      if(x.collected > x.id*100){
        x.canCreate = true
      }
      if(x.collected < x.id*100){
        x.canCreate = false
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

    if(resourcesArr[e.target.id-1].collected > resourcesArr[e.target.id-1].id*(resourcesArr[e.target.id-1].amount*10)) {
      resourcesArr[e.target.id-1].collected -= resourcesArr[e.target.id-1].id*(resourcesArr[e.target.id-1].amount*10)
      resourcesArr[e.target.id-1].amount++

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







  toggleModal(){

    this.setState((prev, props) => {
      const newState = !prev.modalState

      return { modalState: newState }
    })
  }

  newButton(e){

    resourcesArr[e.target.id-1].created = true
    this.toggleModal()

  }

  render(){
    return(

      <div className="container">
        <div className="columns parent">


          {resourcesArr &&
            resourcesArr.map(x => {
              return <div key={x.id} className='resources columns'>
                <div  className ='column'>
                  {x.building} 
                </div>
                <div className ='column' onClick={this.buyBuilding} id={x.id}>
                  {x.amount}
                </div>
                {x.canCreate && !x.created && <div className='column'  id={x.id} onClick={this.newButton}>
               NEW

                </div>}

              </div>
            })}
          {this.state.modalState ===  true  &&  <div className="modal is-active">
            <div className="modal-background"></div>
            <div className="modal-content">
              <form onSubmit={this.handleSubmit}>
                <div className='title'>
                Add a resorce to collect and something to produce it
                </div>
                <input type="text" name="resource"  onChange={this.handleChange} placeholder='Resource' />
                <input type="text" name="createdBy" onChange={this.handleChange} placeholder='Created By' />
                <button onClick={this.handleSubmit}/>
              </form>
            </div>
            <button className="modal-close is-large" aria-label="close" onClick={this.toggleModal}></button>
          </div>}
        </div>
      </div>
    )
  }
}



export default Main
