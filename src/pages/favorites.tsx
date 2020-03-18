import React, {Component} from 'react';
import {getPokeData} from '../components/Functions'
import CircularProgress from '@material-ui/core/CircularProgress'


interface State{
    listOfFavoritesPokemons: number[],
    listOfPokemonData : Array<Map<string,any>>,                        //list of the data of the pokemons--> dictionnaries as in App
    fetched : boolean,

}

class Favorites extends Component{

    state: Readonly<State>= {
        listOfFavoritesPokemons : [1,7,8,23,25],         //list of the IDs of the pokemons
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
                
                let newMap = new Map();
                newMap.set("pokeId", data[0]);
                newMap.set("pokeName", data[1]);
                newMap.set("pokeType", data[2]);
                newMap.set("pokeAbility1", data[3]);
                newMap.set("pokeAbility2", data[4]);
                newMap.set("pokeCategory", data[5]);
                newMap.set("pokeHeight", data[6]);
                newMap.set("pokeWeight", data[7]);
                newMap.set("pokePhotoBack", data[8]);
                newMap.set("pokePhotoFront", data[9]);
                
                this.setState({
                    listOfPokemonData : this.state.listOfPokemonData.concat([newMap]),
                    fetched : true})
                
                })
            })
    }


    render(){
        
           
        let {fetched, listOfPokemonData,listOfFavoritesPokemons}=this.state;
     
        if (fetched===false){
                this.getPokeFavoritesData()
       
                return(
                    <div className='Center'>
                    <CircularProgress>
                    </CircularProgress>
                    </div>)
        }
        
        return(
            <div>
                {listOfPokemonData.map(Map => 
                    <div>
                    <button>
                        <img src = {Map.get("pokePhotoFront")} alt = {Map.get("pokeName")}/> 
                        <h3>{Map.get("pokeName")} No {Map.get("pokeId")}</h3>
                    </button>
                </div>)}
            </div>)
        
        

           
                }
            
        }
    
    


export default Favorites

