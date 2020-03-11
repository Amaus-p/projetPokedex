import {getPokeData, getPokeCaracteristics} from './components/Functions'
import { Component } from 'react'

class App extends Component {

    data = (ID : number ) => {
        getPokeData(ID).then(data => console.log (data, data.length))
        getPokeCaracteristics(ID).then((data) => console.log (data, data.length)) 
      }
    
    render (){
        this.data(25)
        return( 'lol')
    }
    
}
   
export default App;