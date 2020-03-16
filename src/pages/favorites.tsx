import React, {Component} from 'react';
import {getPokeData} from '.././components/Functions'
import CircularProgress from '@material-ui/core/CircularProgress'
import '../App.css';

interface State{
    listOfFavoritesPokemons: number[],
    listOfPokemonData : Array<Array<any>>,                        //list of the data of the pokemons--> dictionnaries as in App
    fetched : boolean,

}

class Favorites extends Component<State>{
    state: Readonly<State>= {
        listOfFavoritesPokemons : [25,3 ,7 ,6],         //list of the IDs of the pokemons
        listOfPokemonData : [],                        //list of the data of the pokemons--> dictionnaries as in App
        fetched : false,
    }
    
    getPokeFavoritesData = () => {
        this.state.listOfFavoritesPokemons.forEach(element => {
            getPokeData(element)        
                .then((data) => {
                
                /*let pokeId = data[0];
                let pokeName = data[1];
                let pokeType = data[2];
                let pokeAbility1 = data[3];
                let pokeAbility2 = data[4];
                let pokeCategory = data[5];
                let pokeHeight = data[6];
                let pokeWeight = data[7];
                let pokePhotoBack = data[8];
                let pokePhotoFront = data[9];
                let Next = data[10];*/
                console.log('this')
                console.log(this)
                this.setState({
                    listOfPokemonData : this.state.listOfPokemonData.concat([data]),
                    fetched : true})
                
                })
            })
    }


    render(){
        
           
        let {fetched, listOfPokemonData,listOfFavoritesPokemons}=this.state;
        console.log('listOfPokemonData')
        console.log(listOfPokemonData)
        console.log('listOfFavoritesPokemons')
        console.log(listOfFavoritesPokemons)
        if (fetched===false){
                this.getPokeFavoritesData()
                console.log(fetched)
                console.log('listOfPokemonData')
                console.log(listOfPokemonData)
                return(
                    <div className='Center'>
                    <CircularProgress>
                    </CircularProgress>
                    </div>)
        }
        
        return(
            <div>
                {listOfPokemonData.map(data => 
                    <div>
                    <button>
                        <img src = {data[9]} alt = {data[1]}/> 
                        <h3>{data[1]} No {data[0]}</h3>
                    </button>
                </div>)}
            </div>)
        
        

           
                }
            
        }
    
    


export default Favorites

