import React, {Component} from 'react';

import CircularProgress from '@material-ui/core/CircularProgress'

import Initialisation from '../components/Initialisation';
import PokemonPrint from '../components/NewPokemonPrint'
import {getPokeData, getPokeCaracteristics, getPokeSpeciesData} from '.././components/Functionsdecoup'


interface State{
  ID : string | number,                  //pokeName or pokeID
  pokeId : number ,
  pokeName : string ,
  pokeType : string,
  pokeCategory : string,
  pokeDescription: string,
  pokeHeight : string,
  pokeWeight : string,
  pokeAbility1 : string,
  pokeAbility2 : string,
  pokePhotoBack : string,
  pokePhotoFront : string,
  pokeFamilyData: Array<Map<string,any>>,      //list of the data of the pokemons--> dictionnaries as in App
  Next : boolean,
  init : boolean,
  loadedData : boolean,
  loadedFamilyData : boolean,
}

class App extends Component {
  
    state : Readonly<State> = {
      ID : '',                  //pokeName or pokeID
      pokeId : 0,
      pokeName : '',
      pokeType : '',
      pokeCategory : '',
      pokeDescription: '',
      pokeHeight : '',
      pokeWeight : '',
      pokeAbility1 : '',
      pokeAbility2 : '',
      pokePhotoBack : '',
      pokePhotoFront : '',
      pokeFamilyData : [],
      Next : false,             //allows to stick to one pokemon in the pokedex
      init: false,              //clear the page if init = false
      loadedData : false,
      loadedFamilyData: false,
      }    
  

    getdata = (ID : number | string) => {
      getPokeData(ID)        
        .then((data) => {
          this.setState({
            ID : data[0],
            pokeId : data[0],
            pokeName : data[1],
            pokeType : data[2],
            pokeAbility1 : data[3],
            pokeAbility2 : data[4],
            pokeCategory : data[5],
            pokeHeight : data[6],
            pokeWeight : data[7],
            pokePhotoBack : data[8],
            pokePhotoFront : data[9],
            Next : data[10],
            
        })
      this.getDescription(this.state.pokeId)})
      }
    getDescription = (ID : number ) => {
      getPokeCaracteristics (ID)
        .then((data) => {
          if(data!==undefined){
            this.setState({
              pokeDescription : data,
              loadedFamilyData:true,
            })
          }
          })
    }

    getFamilyInfos = (ID : number|string) => {
      getPokeSpeciesData(ID)
        .then(data =>
        this.setState({
          pokeFamilyData : data
        })
        )      
      this.setState({
        loadedFamilyData : true
      })
    }
    //fx for binding set state of the ID when it the box is filled
    handleChange = (input : string | number) => (event : any) => {
        this.setState({[input]: event.target.value});
      };

    //fx to change the pokémon we are looking at in the pokedex on click
    handleClick = (change : boolean = false, id : string|number = '') => ()=> {
 
      if (change){                        //when we click on the button of a family member of {pokemonName},  
        this.setState ({                  //it changes the pokemon on which we are focused
          Next : !this.state.Next,
          ID : id,
          loadedData: false,
          loadedFamilyData: true,
          pokeDescription:'No description avalable',
        }) ;

      }
      else{
        this.setState ({
        Next : !this.state.Next,
        init : true,
        loadedData: false,
        loadedFamilyData: false,
        pokeDescription:'No description avalable',
        pokeFamilyData : [] }) ;
      }
    }

    render () {
     
      let {ID, pokeId, pokeName, pokeType, pokeAbility1, pokeAbility2, pokeCategory,pokeDescription, pokeHeight,pokeWeight, 
        pokePhotoBack, pokePhotoFront,Next,init,pokeFamilyData, loadedData, loadedFamilyData} = this.state;
      let values = {pokeId, pokeName, pokeType, pokeAbility1, pokeAbility2, pokeCategory,pokeDescription, pokeHeight,pokeWeight, 
        pokePhotoBack, pokePhotoFront,Next,init,pokeFamilyData, loadedData, loadedFamilyData}


      if (!init){
        return (
          <Initialisation
            ID= {ID}
            handleClick= {this.handleClick}
            handleChange= {this.handleChange}/>
        )
      }
      
      else {
        if (Next){
          if (!loadedData || ! loadedFamilyData){
            if (!loadedData){
              this.getdata(ID);
            }
            if (!loadedFamilyData){
              this.getFamilyInfos(ID)
            }
            
            return(
              <div className='Center'>
              <CircularProgress>
              </CircularProgress>
              </div>)
          }
          else{
            return(
              <PokemonPrint
              ID ={ID}
              values= {values}
              handleClick= {this.handleClick}
              handleChange= {this.handleChange}
              pokeFamilyData = {pokeFamilyData}
              />
            )
            }
          }

        else{
          return(
            <PokemonPrint
            ID ={ID}
            values= {values}
            handleClick= {this.handleClick}
            handleChange= {this.handleChange}
            pokeFamilyData = {pokeFamilyData}
            />
          )
          
        }
      }
    }
  }



//<img src = {familyMember1[2]}/> <img src = {familyMember2[2]}/> <img src = {familyMember3[2]}/>
export default App;
