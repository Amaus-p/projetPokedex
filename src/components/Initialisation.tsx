import React, {Component} from 'react';

import './App.css';

class Initialisation extends Component {
    
    render () {
        const {ID, handleClick, handleChange} = this.props
        return(

            <div style={{textAlign: "center",}}>
            <h1> Pokédex </h1> <br/>
            <input type="text" placeholder = 'Entrez le nom ou numéro de votre pokémon' value={ID} onChange={handleChange('ID')}/>
            <button onClick={handleClick()} >Rechercher</button>
            </div>)
    }
    
}

export default Initialisation;