import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './App.css';

class App extends Component {
  
    state = {
          ID : '',                  //pokeName or pokeID
          pokeId : 0,
          pokeName : '',
          pokeType : '',
          pokeCategory : '',
          pokeHeight : '',
          pokeWeight : '',
          pokeAbility1 : '',
          pokeAbility2 : '',
          pokePhotoBack : '',
          pokePhotoFront : '',
          Next : false,             //allows to stick to one pokemon in the pokedex
          init: false,              //initialisation pb avec initialisation ligne 60 apparemment
      }    
  
    // function for binding but I don't understand why do we have to bind it
    // in tsx arguments' type have to be indicated in the brackets
    getData = (ID : number | string) => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${ID}/`)
        .then((response) => {
          return response.json();
        })          
        .then((data) => {this.setState({
          pokeId : data.id,
          pokeName : data.name.toUpperCase(),
          pokeType : data.types[0].type.name,
          pokeAbility1 : data.abilities[0].ability.name,
          pokeAbility2 : data.abilities[1].ability.name,
          pokeCategory : data.species.name,
          pokeHeight : data.height,
          pokeWeight : data.weight / 10,
          pokePhotoBack : data.sprites.back_default,
          pokePhotoFront : data.sprites.front_default,
          Next : false,
        })})
      }
    //fx for binding
    handleChange = (input : string | number) => (event : any) => {
        this.setState({[input]: event.target.value});
      };

    //fx to change the pokémon we are looking at in the pokedex on click
    handleClick = () => this.setState ({
        Next : !this.state.Next,
        init : true }) ;

    render () {

      const {pokeId, pokeName, pokeType, pokeAbility1, pokeAbility2, pokeCategory, pokeHeight,pokeWeight, pokePhotoBack, pokePhotoFront,Next,init} = this.state;
      let {ID} = this.state;

      if (init===false) {
        return(
          <div style={{textAlign: "center",}}>
          <h1> Pokédex </h1> <br/>
          <input type="text" placeholder = 'Entrez le nom ou numéro de votre pokémon' value={this.state.ID} onChange={this.handleChange('ID')}/>
          <button onClick={this.handleClick} >Rechercher</button>
        </div>
        )


      }

      else if (init===true) {
        if (Next===false){
          return(
            <div style={{textAlign: "center",}}>
              <h1> Pokédex </h1> <br/>
              <input type="text" placeholder = 'Entrez le nom ou numéro de votre pokémon' value={this.state.ID} onChange={this.handleChange('ID')}/>
              <button onClick={this.handleClick} >Rechercher</button>
              <h2> {pokeName} No {pokeId} </h2><br/>
              <img src = {pokePhotoFront}/>
              <img src = {pokePhotoBack}/>
              <h3>Taille : 0.{pokeHeight}m</h3>
              <h3>Poids : {pokeWeight}kg</h3>
              <h3>Catégorie : {pokeCategory}</h3>
              <h3>Talent : {pokeAbility1} , {pokeAbility2}</h3>
              <h3>Type : {pokeType}</h3> 
            </div>
            )
          }
  
  
        else if (Next ===true )
          {
            this.getData (ID);
            return(
              <div style={{textAlign: "center",}}> 
                <h1> Pokédex </h1> <br/>
                <input type="text" placeholder = 'Entrez le nom ou numéro de votre pokémon' value={this.state.ID} onChange={this.handleChange('ID')} />
                <button onClick={this.handleClick} >Rechercher</button>
                  <h2> {pokeName} No {pokeId} </h2><br/>
                  <img src = {pokePhotoFront}/>
                  <img src = {pokePhotoBack}/>
                  <h3>Taille : 0.{pokeHeight}m</h3>
                  <h3>Poids : {pokeWeight}kg</h3>
                  <h3>Catégorie : {pokeCategory}</h3>
                  <h3>Talent : {pokeAbility1} , {pokeAbility2}</h3>
                  <h3>Type : {pokeType}</h3>       
              </div>
          )
          }            
      }   
    }

}



export default App;
