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
                console.log(data)
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
                listOfPokemonData.concat({'ID': data[0], 'name': data[1], 'photo':data[9]})})
            
        });
        console.log(listOfPokemonData)
        if (listOfPokemonData.length && listOfPokemonData[0].photo){
            return(
                <div>
                    <button>
                        work in progress
                        <img src = {'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png'} alt = {'Pikachu'}/> 
                        <h3>{'Pikachu'} No {25}</h3>
                    </button>
                </div>
               
                
            )
        }
        
    }
}

export default Favorites

