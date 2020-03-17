import React, { Component } from "react";


interface Props {
    ID: string|number;
    handleClick: (change?: boolean, id?: React.Key) => () => void;
    handleChange: (input: string | number) => (event: any) => void;
    values : {[key : string] : any};
    pokeFamilyData :  Array<Map<string,any>>;
  }

class PokemonPrint extends Component<Props>{

    
    render (){
        const { values, ID, handleClick, handleChange, pokeFamilyData} = this.props
        const {pokeId, pokeName, pokeType, pokeAbility1, pokeAbility2, pokeCategory,pokeDescription, pokeHeight,pokeWeight, 
            pokePhotoBack, pokePhotoFront} = values;
  
        

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
            <h2> Evolutions </h2>
            <div className = "soixante-pour-cent">
                <div className="centered">

                {pokeFamilyData.map(Map => 
                    <div key={Map.get('pokeId')}>
                    <button className = "vingt-pour-cent" onClick ={handleClick(true,Map.get('pokeId'))}>
                        <img src = {Map.get("pokePhoto")} alt = {Map.get("pokeName")}/> 
                        <h3>{Map.get("pokeName")} No {Map.get("pokeId")}</h3>
                    </button>
                    </div>)}
                                    
                    </div>
            </div>
        
            </div>
            )
    }
}

export default PokemonPrint;

