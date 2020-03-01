import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './App.css';

class App extends Component {
  
    state = {
          ID : 0,
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
      }    
  
    // function for binding but I don't understand why do we have to bind it
    //I would like to put ID in argument in getData but it raises an error, I don't know why
    //So I put ID in state but ID should be a name or a figure so there is a type problem
    getData = () => {
        fetch(`https://pokeapi.co/api/v2/pokemon/pikachu/`)
        .then((response) => {
          return response.json();
        })          
        .then((data) => {this.setState({
          pokeId : data.id,
          pokeName : data.name,
          pokeType : data.types[0].type.name,
          pokeAbility1 : data.abilities[0].ability.name,
          pokeAbility2 : data.abilities[1].ability.name,
          pokeCategory : data.species.name,
          pokeHeight : data.height,
          pokeWeight : data.weight,
          pokePhotoBack : data.sprites.back_default,
          pokePhotoFront : data.sprites.front_default,
        })})
      }

    render () {
      
      const {pokeId, pokeName, pokeType, pokeAbility1, pokeAbility2, pokeCategory, pokeHeight,pokeWeight, pokePhotoBack, pokePhotoFront} = this.state;

      this.getData();

      return(
      <div> 
          <h1> Votre Pokédex </h1>
          <br/>
            <img> {pokePhotoBack}</img>
            <img> {pokePhotoFront}</img>
            <h2> {pokeName} No {pokeId} </h2><br/>
            <h3>Taille : 0.{pokeHeight}m</h3><br/>
            <h3>Poids : {pokeWeight}kg</h3><br/>
            <h3>Catégorie : {pokeCategory}</h3><br/>
            <h3>Talent : {pokeAbility1} , {pokeAbility2}</h3><br/>
            <h3>Type : {pokeType}</h3><br/>
      </div>
      )
    }

}





//Input --> the user gives the name of the pokemon of which he wants to know some information 
//Output --> a card with the image of the pokemon, its caracteristics
  //category
  //Name
  //Talent
  //High
  //Weight
  //Sex
  //Type 
  //Weakness
  //Evolution and link towards the other pokemons in which it can evolve
  //List of differents moves it can have (search bar)




export default App;
