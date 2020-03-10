import React, {Component} from 'react';
import {getPokeData} from '.././components/Functions'

import '../App.css';

class Favorites extends Component{

    render(){

        let listOfFavoritesPokemons = [25,3 ,7 ,6];         //list of the IDs of the pokemons
        let listOfPokemonData:Array<any> = [] ;                 //list of the data of the pokemons--> dictionnaries as in App

        listOfFavoritesPokemons.forEach(element => {
            getPokeData(element)        
                .then((data) => {
                let pokeId = data[0];
                let pokeName = data[1];
                let pokeType = data[2];
                let pokeAbility1 = data[3];
                let pokeAbility2 = data[4];
                let pokeCategory = data[5];
                let pokeHeight = data[6];
                let pokeWeight = data[7];
                let pokePhotoBack = data[8];
                let pokePhotoFront = data[9];
                let Next = data[10];
                listOfPokemonData.push({'ID': pokeId, 'name': pokeName, 'photo':pokePhotoBack})})
            
        });
        let length = listOfFavoritesPokemons.length
        return(
            <div>
                <button>
                    work in progress
                    
                </button>
            </div>
           
            
        )
    }
}

export default Favorites

//<img src = {listOfPokemonData[0].photo} alt = {listOfPokemonData[0].name}/> 
//<h3>{listOfPokemonData[0].name} No {listOfPokemonData[0].ID}</h3>