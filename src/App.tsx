import React, {Component} from 'react';
import PropTypes, { array } from 'prop-types';
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
          familyMember1 : ['' , 0, '']  ,    // Name, ID, photo
          familyMember2 : ['' , 0, ''] ,      //LA COMMANDE SCR LIGNE 150 A UN PROBLEME AVEC QQCH DANS CETTE STRUCTURE DE DONNEES?
          familyMember3 : ['' , 0, ''] ,      
          Next : false,             //allows to stick to one pokemon in the pokedex
          init: false,              //clear the page if init = false
      }    
  
    // function for binding but I don't understand why do we have to bind it
    // in tsx arguments' type have to be indicated in the brackets
    getPokeData = (ID : number | string) => {
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
              familyMember1 : [data.chain.species.name,this.state.familyMember1[1],this.state.familyMember1[2]],
              familyMember2 : [data.chain.evolves_to[0].species.name,this.state.familyMember2[1],this.state.familyMember2[2]],
              familyMember3 : [data.chain.evolves_to[0].evolves_to[0].species.name,this.state.familyMember2[1],this.state.familyMember2[2]],
             })
             this.getFamilyInfo()
          })
        })
      }

      getFamilyInfo = () => {
        const {familyMember1,familyMember2,familyMember3} =this.state
        fetch(`https://pokeapi.co/api/v2/pokemon/${familyMember1[0]}/`)
        .then((response) => {
          return response.json();
        })          
        .then((data) => {

          this.setState({
            familyMember1 : [familyMember1[0],data.id,data.sprites.front_default]
        })
        })
        fetch(`https://pokeapi.co/api/v2/pokemon/${familyMember2[0]}/`)
        .then((response) => {
          return response.json();
        })          
        .then((data) => {

          this.setState({
            familyMember2 : [familyMember2[0],data.id,data.sprites.front_default]
        })})
        fetch(`https://pokeapi.co/api/v2/pokemon/${familyMember3[0]}/`)
        .then((response) => {
          return response.json();
        })          
        .then((data) => {

          this.setState({
            familyMember3 : [familyMember3[0],data.id,data.sprites.front_default]
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

      const {pokeId, pokeName, pokeType, pokeAbility1, pokeAbility2, pokeCategory, pokeHeight,pokeWeight, 
              pokePhotoBack, pokePhotoFront,Next,init,familyMember1,familyMember2,familyMember3} = this.state;
      let {ID} = this.state;
      let url1 = familyMember1[2];
      console.log(familyMember1)
      console.log(3)
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
        if (Next===false){      // pour garder ce pokémon sur la page jusqu'au prochain clic sur "rechercher"
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
              <h3>Type : {pokeType}</h3> <br/>
              <h2> Evolution </h2>
              <img src = {familyMember1[2]}/> <img src = {familyMember2[2]}/> <img src = {familyMember3[2]}/>
              <h3> {familyMember1[0]} No {familyMember1[1]}  
              {familyMember2[0]}  No {familyMember2[1]}  
              {familyMember3[0]} No{familyMember3[1]} </h3>
            </div>
            )
          }
  
  
        else if (Next ===true )
          {
            
            this.getPokeData(ID);
            this.getPokeSpeciesData(ID);
            console.log(familyMember1)
            console.log(4)
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
                  <h2> Evolution </h2><br/>
                  <img src = {familyMember1[2]} alt={familyMember1[0]}/> <img src = {familyMember2[2]}/> <img src = {familyMember3[2]}/>
                  <h3> {familyMember1[0]} No {familyMember1[1]}  
                  {familyMember2[0]}  No {familyMember2[1]}  
                  {familyMember3[0]} No{familyMember3[1]} </h3>


              </div>
          )
          }            
      }   
    }

}

//<img src = {familyMember1[2]}/> <img src = {familyMember2[2]}/> <img src = {familyMember3[2]}/>
export default App;

