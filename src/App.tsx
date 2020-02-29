import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './App.css';

class App extends Component {

    state = {
      pokemonData : {
        pokeId : 0,
        pokeName : '',
        pokeType : '',
        pokeCategory : '',
        pokeHigh : '',
        pokeWeight : '',
      }
    }

    function GetData (ID){
      fetch(`https://pokeapi.co/api/v2/pokemon/${ID}/`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {this.pokemonData.setState({
        pokeId : data.results.id,
        pokeName : data.results.name,
        pokeType : '',
        pokeCategory : '',
        pokeHigh : '',
        pokeWeight : '',
      })})
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
