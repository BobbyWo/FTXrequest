import './App.css'
import React from 'react'
import axios from 'axios'
import Table from './Table/Table'


const asset = "ETH"
const items = ["name","bid","ask","price","underlying","volumeUsd24h"]
class outputdatatype{
  constructor(name,bid,ask,price,underlying,volumeUsd24h){
    this.name = name
    this.bid = bid
    this.ask = ask
    this.price = price
    this.underlying = underlying
    this.volumeUsd24h = volumeUsd24h
  }
}
class App extends React.Component{
  constructor(props) {
    super(props)
  
    this.state = {
       records : []
    }
  }
  // get information using axios to get http request from url
  httprequest(){
    axios.get('https://ftx.com/api/markets')
      .then(response => {
        console.log(response)
        this.setState({records : response.data.result})
      })
      .catch(error => {
        console.log(error)
      })
  }
  componentDidMount(){
    // get once before go into the interval
    this.httprequest()
    // ask for http request for every 10 seconds
      this.timer= setInterval(()=> {
        this.httprequest()
      },10000)
  }
  // clean up the interval for for new request
  componentWillUnmount(){
    if(this.timer != null){
      clearInterval(this.timer)
    }
  }
  render(){
    const {records} = this.state
    var filteredrecords = []
    var outputdata = []
    //filter spot and ETH record
    records.forEach((record,index) => (
        record.type === "spot"?filteredrecords.push(record):null
    ))
    filteredrecords.forEach((frecord,index) => (
      frecord.baseCurrency === asset? 
      outputdata.push(new outputdatatype(frecord.name,frecord.bid,frecord.ask,frecord.price,frecord.underlying ===null?"null":frecord.underlying,frecord.volumeUsd24h)):
      null
    ))
    // create table for displaying information
  return (
    <div className="App">
      <h1>ETH</h1>
      {
        <Table list={outputdata} colname={items}/>
      }
    </div>
    )
  }
}

export default App
