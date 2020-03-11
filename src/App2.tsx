import React, {Component} from 'react';
import PropTypes, { array, string, number } from 'prop-types';
import './App.css';
import CircularProgress from '@material-ui/core/CircularProgress'
import {getPokeData, getPokeCaracteristics} from './components/Functions'

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
          familyName1: '',                  //name of the first pokemon in the evolution branch of {pokemonName}
          familyName2:'',
          familyName3:'',
          familyID1:-1,                     //ID of the first pokemon in the evolution branch of {pokemonName}
          familyID2:-1,
          familyID3:-1,
          familyPhoto1:'',                  //front photo of the first pokemon in the evolution branch of {pokemonName}
          familyPhoto2:'',
          familyPhoto3:'',      
          Next : false,             //allows to stick to one pokemon in the pokedex
          init: false,              //clear the page if init = false
      }    
  

    // in tsx arguments' type have to be indicated in the brackets

    
    getPokeData = (ID : number | string) => {
      fetch(`https://pokeapi.co/api/v2/pokemon/${ID}/`)
      .then((response) => {
        return response.json();
      })          
      .then((data) => {this.setState({
        ID : data.id,
        pokeId : data.id,
        pokeName : data.name.toUpperCase(),
        pokeType : data.types[0].type.name,
        pokeAbility1 : data.abilities[0].ability.name,
        pokeAbility2 : data.abilities[1].ability.name,
        pokeCategory : data.species.name,
        pokeHeight : data.height/10,
        pokeWeight : data.weight / 10,
        pokePhotoBack : data.sprites.back_default,
        pokePhotoFront : data.sprites.front_default,

        Next : false,
      })

      this.getPokeCaracteristics (this.state.pokeId) })
    }

      getPokeCaracteristics (id : number) {
        fetch(`https://pokeapi.co/api/v2/characteristic/${id}/`)
        .then((response) => {
          return response.json();
        })          
        .then((data) => {this.setState({
          pokeDescription : data.descriptions[0].description,
        })})
      }


      getPokeSpeciesData = (ID : number | string) => {
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${ID}/`)
          .then((response) => {
            return response.json();
          })          
          .then((data) => {
            let evolutionChainUrl = data.evolution_chain.url        //gives the url of the evolution chain in order to make the 
            fetch(evolutionChainUrl)
              .then((response) => {
                return response.json();
              })          
              .then((data) => {
            this.setState({
              familyName1 : data.chain.species.name,
              familyName2 : data.chain.evolves_to[0].species.name,
              familyName3 : data.chain.evolves_to[0].evolves_to[0].species.name,
             })
             this.getFamilyInfo()
          })
        })
      }

      getFamilyInfo = () => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${this.state.familyName1}/`)
        .then((response) => {
          return response.json();
        })          
        .then((data) => {

          this.setState({
            familyID1: data.id,
            familyPhoto1 : data.sprites.front_default,
        })
        })
        fetch(`https://pokeapi.co/api/v2/pokemon/${this.state.familyName2}/`)
        .then((response) => {
          return response.json();
        })          
        .then((data) => {

          this.setState({
            familyID2: data.id,
            familyPhoto2 : data.sprites.front_default,
        })
        })
        fetch(`https://pokeapi.co/api/v2/pokemon/${this.state.familyName3}/`)
        .then((response) => {
          return response.json();
        })          
        .then((data) => {

          this.setState({
            familyID3: data.id,
            familyPhoto3 : data.sprites.front_default,
        })
        })
      }
    


    //fx for binding set state of the ID when it the box is filled
    handleChange = (input : string | number) => (event : any) => {
        this.setState({[input]: event.target.value});
      };

    //fx to change the pokémon we are looking at in the pokedex on click
    handleClick = (change : boolean = false, id : string|number = '') => ()=> {
      console.log(change, id)
      if (change){                        //when we click on the button of a family member of {pokemonName},  
        this.setState ({                  //it changes the pokemon on which we are focused
          Next : !this.state.Next,
          init : true, 
          ID : id}) ;

      }
      else{
        this.setState ({
        Next : !this.state.Next,
        init : true }) ;
      }
    }



    render () {
     
      const {pokeId, pokeName, pokeType, pokeAbility1, pokeAbility2, pokeCategory,pokeDescription, pokeHeight,pokeWeight, 
              pokePhotoBack, pokePhotoFront,Next,init,familyID1,familyID2,familyID3,familyName1,familyName2,familyName3,
              familyPhoto1, familyPhoto2, familyPhoto3} = this.state;
      let {ID} = this.state;
 
      if (init===false) {
        return(
            <div style={{textAlign: "center",}}>
            <h1> Pokédex </h1> <br/>
            <input type="text" placeholder = 'Entrez le nom ou numéro de votre pokémon' value={this.state.ID} onChange={this.handleChange('ID')}/>
            <button onClick={this.handleClick()} >Rechercher</button>
            </div>)
     }

      else if (init===true) {
        if (Next===false){      // pour garder ce pokémon sur la page jusqu'au prochain clic sur "rechercher"
          return(
          
            
              <div style={{textAlign: "center",}}>
                
                <h1> Pokédex </h1> <br/>
                <input type="text" placeholder = 'ID ou nom du pokemon' value={this.state.ID} onChange={this.handleChange('ID')}/>
                <button onClick={this.handleClick()} >Rechercher</button>
                
                <h2> {pokeName} No {pokeId} </h2><br/>
                <img src = {pokePhotoFront}/>
                <img src = {pokePhotoBack}/>
                <h3> Description: {pokeDescription}</h3>
                <h3>Taille : 0.{pokeHeight}m</h3>
                <h3>Poids : {pokeWeight}kg</h3>
                <h3>Catégorie : {pokeCategory}</h3>
                <h3>Talent : {pokeAbility1} , {pokeAbility2}</h3>
                <h3>Type : {pokeType}</h3> <br/>
                <h2> Evolution </h2>
                <button onClick ={this.handleClick(true,familyID1)}>
                  <img src = {familyPhoto1} alt = {familyName1}/> 
                  <h3>{familyName1} No {familyID1}</h3>
                </button>
                <button onClick ={this.handleClick(true,familyID2)}>
                  <img src = {familyPhoto2} alt = {familyName2} onClick ={this.handleChange(familyID2)}/> 
                  <h3>{familyName2} No {familyID2}</h3>
                </button>
                <button onClick ={this.handleClick(true,familyID3)}>
                  <img src = {familyPhoto3} alt = {familyName3} onClick ={this.handleChange(familyID3)}/> 
                  <h3>{familyName3} No {familyID3}</h3>
                </button>
                
               
              </div>
            
              
            )
          }
  
  
        else if (Next ===true )
          {

            this.getPokeData(ID);
            this.getPokeSpeciesData(ID);
            return(
              <div style={{textAlign: "center",}}>
              <h1> Pokédex </h1> <br/>
              <input type="text" placeholder = 'ID ou nom du pokemon' value={this.state.ID} onChange={this.handleChange('ID')}/>
              <button onClick={this.handleClick()} >Rechercher</button>
              <h2> {pokeName} No {pokeId} </h2><br/>
              <img src = {pokePhotoFront}/>
              <img src = {pokePhotoBack}/>
              <h3> Description: {pokeDescription}</h3>
              <h3>Taille : 0.{pokeHeight}m</h3>
              <h3>Poids : {pokeWeight}kg</h3>
              <h3>Catégorie : {pokeCategory}</h3>
              <h3>Talent : {pokeAbility1} , {pokeAbility2}</h3>
              <h3>Type : {pokeType}</h3> <br/>
              <h2> Evolution </h2>
              <button onClick ={this.handleClick(true,familyID1)}>
                <img src = {familyPhoto1} alt = {familyName1}/> 
                <h3>{familyName1} No {familyID1}</h3>
              </button>
              <button onClick ={this.handleClick(true,familyID2)}>
                <img src = {familyPhoto2} alt = {familyName2} onClick ={this.handleChange(familyID2)}/> 
                <h3>{familyName2} No {familyID2}</h3>
              </button>
              <button onClick ={this.handleClick(true,familyID3)}>
                <img src = {familyPhoto3} alt = {familyName3} onClick ={this.handleChange(familyID3)}/> 
                <h3>{familyName3} No {familyID3}</h3>
              </button>
            </div>
          )
          }            
      }   
    }

}

//<img src = {familyMember1[2]}/> <img src = {familyMember2[2]}/> <img src = {familyMember3[2]}/>
export default App;
