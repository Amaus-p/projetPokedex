import React, {Component} from 'react';
import './App.css';
import {getPokeData, getPokeCaracteristics, getPokeSpeciesData} from './components/Functions1.1';
import { CircularProgress } from '@material-ui/core';


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
          familyData : [],
          familyUrl : '',
          Next : false,             //allows to stick to one pokemon in the pokedex
          init: false,              //clear the page if init = false
          loadingData : true,
          loadingFamilyData: true,
          
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
              loadingData:false,
            })
          }
          })
    }

    familyData = (ID : number | string, familyData : Array<object>) => {
        getPokeSpeciesData(ID, familyData)
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
              pokePhotoBack, pokePhotoFront,Next,init,familyData, loadingData, loadingFamilyData} = this.state;
      
      let handleChange=this.handleChange;
      let handleClick=this.handleClick;
      let {ID} = this.state;

      if (init===false) {
        return(
          <div style={{textAlign: "center",}}>
            <h1> Pokédex </h1> <br/>
            <input type="text" placeholder = 'nom ou numéro du pokémon' value={ID} onChange={handleChange('ID')}/>
            <button onClick={handleClick()} >Rechercher</button>
          </div>
          )
     }

      else if (init===true) {
        
        if (Next===true){

          while (loadingData || loadingFamilyData ){
            this.getdata(ID);
    
            this.familyData(ID,familyData)
            return(
              <div className='Center'>
                <CircularProgress>
                </CircularProgress>
              </div>)
          }
        }

        
         return(
          <div style={{textAlign: "center",}}>
          <h1> Pokédex </h1> <br/>
          <input type="text" placeholder = 'ID ou nom du pokemon' value={ID} onChange={handleChange('ID')}/>
          <button onClick={handleClick()} >Rechercher</button>
          <h2> {pokeName} No {pokeId} </h2><br/>
          <img src = {pokePhotoFront} alt={pokeName}/>
          <img src = {pokePhotoBack} alt={pokeName}/>
          <h3> Description: {pokeDescription}</h3>
          <h3>Taille : {pokeHeight}m</h3>
          <h3>Poids : {pokeWeight}kg</h3>
          <h3>Catégorie : {pokeCategory}</h3>
          <h3>Talent : {pokeAbility1} , {pokeAbility2}</h3>
          <h3>Type : {pokeType}</h3> <br/>
          <h2> Evolution </h2>
          
          </div>
            )
      }   
    }

}


/*
<button onClick ={handleClick(true,familyData[0].ID)}>
              <img src = {familyPhoto[1]} alt = {familyName[1]}/> 
              <h3>{familyName[1]} No {familyID[1]}</h3>
          </button>
          <button onClick ={handleClick(true,familyID[2])}>
              <img src = {familyPhoto[2]} alt = {familyName[2]}/> 
              <h3>{familyName[2]} No {familyID[2]}</h3>
          </button>
          <button onClick ={handleClick(true,familyID[3])}>
              <img src = {familyPhoto[3]} alt = {familyName[3]}/> 
              <h3>{familyName[3]} No {familyID[3]}</h3>
          </button>*/
//https://cdiese.fr/syntaxe-typescript-en-10-min/
export default App;

