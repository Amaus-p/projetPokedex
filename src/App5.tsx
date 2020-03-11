import React, {Component} from 'react';
import './App.css';
import {getPokeData, getPokeCaracteristics, getPokeSpeciesData} from './components/Functions';
import { CircularProgress } from '@material-ui/core';

import Initialisation from "./components/Initialisation";
import PokemonPrint from "./components/PokemonPrint";

class App extends Component {

    state = {
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

          familyName : [''], 
          familyID: [-1],
          familyPhoto: [''],
          familyUrl : '',
          Next : false,             //allows to stick to one pokemon in the pokedex
          init: false,              //clear the page if init = false
          loadingData : true,
          loadingFamilyData: true,
          
      }    

    getdata = (ID : number | string) => {
      getPokeData(ID)        
        .then((data) => {
          console.log(data)
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
          console.log(data)
          console.log('ici data')
          if(data!==undefined){
            this.setState({
              pokeDescription : data,
              loadingData:false,
            })
          }
          })
    }

    familyData = (ID : number | string, familyNames : Array<string>, 
      familyPhotos : Array<string>, familyIDs: Array<number>) => {
        getPokeSpeciesData(ID, familyNames,familyPhotos, familyIDs)
        .then(data => 
          {this.setState({
          familyUrl : data[0],
          loadingFamilyData : data[1],
        })}
        )
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
          loadingData:true,
          loadingFamilyData: false,
          pokeDescription:'No description avalable',
          familyName: [''],
          familyID:[-1],
          familyPhoto:[''],
        }) ;

      }
      else{
        this.setState ({
        Next : !this.state.Next,
        init : true,
        loadingData:true,
        loadingFamilyData : false,
        pokeDescription:'No description avalable',
        familyName: [''],
        familyID:[-1],
        familyPhoto:[''], }) ;
      }
    }


    render () {

      let {pokeId, pokeName, pokeType, pokeAbility1, pokeAbility2, pokeCategory,pokeDescription, pokeHeight,pokeWeight, 
              pokePhotoBack, pokePhotoFront,Next,init,familyID,familyName,familyPhoto, loadingData, loadingFamilyData} = this.state;
      let values = {pokeId, pokeName, pokeType, pokeAbility1, pokeAbility2, pokeCategory,pokeDescription, pokeHeight,pokeWeight, 
        pokePhotoBack, pokePhotoFront,Next,init,familyID,familyName,familyPhoto, loadingData, loadingFamilyData}
      let {ID} = this.state;

      if (init===false) {
        return(
          <Initialisation
            ID= {ID}
            handleClick= {this.handleClick}
            handleChange= {this.handleChange}/>
          )
     }

      else if (init===true) {
        
        if (Next===true){
          if (loadingData || loadingFamilyData ){
            this.getdata(ID);
            this.familyData(ID,familyName,familyPhoto,familyID)
            return(
                <div className='Center'>
                <CircularProgress>
                </CircularProgress>
                </div>)
            }
          return(
            <PokemonPrint
            ID ={ID}
            values= {values}
            handleClick= {this.handleClick}
            handleChange= {this.handleChange}
            />
          )  
        }   
      }

    }
  }

//https://cdiese.fr/syntaxe-typescript-en-10-min/
export default App;

