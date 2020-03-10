import React, {Component} from 'react';
import PropTypes, { array, string, number } from 'prop-types';
import './App.css';
import CircularProgress from '@material-ui/core/CircularProgress'
import {getPokeData, getPokeCaracteristics} from './components/Functions'

class App extends Component {
  
    state = {
      ID : '',                  //pokeName or pokeID
      pokeId : 0,
      pokeName : '',
      pokeType : '',
      pokeCategory : '',
      pokeDescription: '',
      pokeHeight : '',
      pokeWeight : '',
      pokeAbility1 : '',
      pokeAbility2 : '',
      pokePhotoBack : '',
      pokePhotoFront : '',
      familyName : [''], 
      familyID: [-1],
      familyPhoto: [''],
      familyUrl : '',
      Next : false,             //allows to stick to one pokemon in the pokedex
      init: false,              //clear the page if init = false
      loadingData : true,
      loadingFamilyData: true,
      }    
  

      getPokeData = (ID : number | string) => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${ID}/`)
        .then((response) => {
          return response.json();
        })          
        .then((data) => {this.setState({
          ID : data.id,
          pokeId : data.id,
          pokeName : data.name.toUpperCase(),
          pokeType : data.types[0].type.name,
          pokeAbility1 : data.abilities[0].ability.name,
          pokeAbility2 : data.abilities[1].ability.name,
          pokeCategory : data.species.name,
          pokeHeight : data.height/10,
          pokeWeight : data.weight / 10,
          pokePhotoBack : data.sprites.back_default,
          pokePhotoFront : data.sprites.front_default,

          Next : false,
        })

        this.getPokeCaracteristics (this.state.pokeId) })
      }


      getPokeCaracteristics (id : number) {
        fetch(`https://pokeapi.co/api/v2/characteristic/${id}/`)
        .then((response) => {
          return response.json();
        })          
        .then((data) => {this.setState({
          pokeDescription : data.descriptions[0].description,
        })})
      }


      getPokeSpeciesData = (ID : number | string) => {
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${ID}/`)
          .then((response) => {
            return response.json();
          })          
          .then((data) => {
            this.setState({
              familyUrl:data.evolution_chain.url,
              })        //gives the url of the evolution chain in order to make the 
            fetch(this.state.familyUrl)
              .then((response) => {
                return response.json();
              })          
              .then((data) => {
             this.getFamilyInfos (data)
            })
        })
      }
      
      getFamilyInfos = (data : any) => {
        
        let exit = false;                              // exit the loop when we have found every pokemon in the family
        let name :string = data.chain.species.name;
        data = data.chain.evolves_to; 
        this.getFamilyPokeInfos (name);
        while (!exit){

          this.state.familyName.push(name);         
          if (data.length!=undefined && data.length != 0){
            for (let i=0; i<data.length; i++){
              name = data[i].species.name;
              this.getFamilyPokeInfos (name);
            }
            data=data[0].evolves_to;
          }
          else {
            exit = true
          }
                
        }
      }
      
      getFamilyPokeInfos = (name:string) => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
          .then((response) => {
            return response.json();
          })          
          .then((data) => {
            this.state.familyID.push(data.id);
            this.state.familyPhoto.push(data.sprites.front_default);            
         })
      }   


    //fx for binding set state of the ID when it the box is filled
    handleChange = (input : string | number) => (event : any) => {
        this.setState({[input]: event.target.value});
      };

    //fx to change the pokémon we are looking at in the pokedex on click
    handleClick = (change : boolean = false, id : string|number = '') => ()=> {
      console.log(change, id)
      if (change){                        //when we click on the button of a family member of {pokemonName},  
        this.setState ({                  //it changes the pokemon on which we are focused
          Next : !this.state.Next,
          ID : id,
          familyName: [''],
          familyID:[-1],
          familyPhoto:[''],
        }) ;

      }
      else{
        this.setState ({
        Next : !this.state.Next,
        init : true,
        familyName: [''],
        familyID:[-1],
        familyPhoto:[''], }) ;
      }
    }

    render () {
     
      let {pokeId, pokeName, pokeType, pokeAbility1, pokeAbility2, pokeCategory,pokeDescription, pokeHeight,pokeWeight, 
        pokePhotoBack, pokePhotoFront,Next,init,familyID,familyName,familyPhoto, loadingData, loadingFamilyData} = this.state;
      let {ID} = this.state;
 
      if (init===false) {
        return(
            <div style={{textAlign: "center",}}>
            <h1> Pokédex </h1> <br/>
            <input type="text" placeholder = 'Entrez le nom ou numéro de votre pokémon' value={this.state.ID} onChange={this.handleChange('ID')}/>
            <button onClick={this.handleClick()} >Rechercher</button>
            </div>)
     }

      else if (init===true) {
        if (Next===false){      // pour garder ce pokémon sur la page jusqu'au prochain clic sur "rechercher"
        console.log(familyID)
          return(
          
            
              <div style={{textAlign: "center",}}>
                
                <h1> Pokédex </h1> <br/>
                <input type="text" placeholder = 'ID ou nom du pokemon' value={this.state.ID} onChange={this.handleChange('ID')}/>
                <button onClick={this.handleClick()} >Rechercher</button>
                
                <h2> {pokeName} No {pokeId} </h2><br/>
                <img src = {pokePhotoFront}/>
                <img src = {pokePhotoBack}/>
                <h3> Description: {pokeDescription}</h3>
                <h3>Taille : 0.{pokeHeight}m</h3>
                <h3>Poids : {pokeWeight}kg</h3>
                <h3>Catégorie : {pokeCategory}</h3>
                <h3>Talent : {pokeAbility1} , {pokeAbility2}</h3>
                <h3>Type : {pokeType}</h3> <br/>
                <h2> Evolution </h2>
                <button onClick ={this.handleClick(true,familyID[1])}>
                  <img src = {familyPhoto[1]} alt = {familyName[1]}/> 
                  <h3>{familyName[1]} No {familyID[1]}</h3>
                </button>
                <button onClick ={this.handleClick(true,familyID[2])}>
                  <img src = {familyPhoto[2]} alt = {familyName[2]}/> 
                  <h3>{familyName[2]} No {familyID[2]}</h3>
               </button>
               <button onClick ={this.handleClick(true,familyID[3])}>
                  <img src = {familyPhoto[3]} alt = {familyName[3]}/> 
                  <h3>{familyName[3]} No {familyID[3]}</h3>
               </button>
                
               
              </div>
            
              
            )
          }
  
  
        else if (Next ===true )
          {

            this.getPokeData(ID);
            this.getPokeSpeciesData(ID);
            return(
              <div style={{textAlign: "center",}}>
              <h1> Pokédex </h1> <br/>
              <input type="text" placeholder = 'ID ou nom du pokemon' value={this.state.ID} onChange={this.handleChange('ID')}/>
              <button onClick={this.handleClick()} >Rechercher</button>
              <h2> {pokeName} No {pokeId} </h2><br/>
              <img src = {pokePhotoFront}/>
              <img src = {pokePhotoBack}/>
              <h3> Description: {pokeDescription}</h3>
              <h3>Taille : 0.{pokeHeight}m</h3>
              <h3>Poids : {pokeWeight}kg</h3>
              <h3>Catégorie : {pokeCategory}</h3>
              <h3>Talent : {pokeAbility1} , {pokeAbility2}</h3>
              <h3>Type : {pokeType}</h3> <br/>
              <h2> Evolution </h2>
              <button onClick ={this.handleClick(true,familyID[1])}>
                  <img src = {familyPhoto[1]} alt = {familyName[1]}/> 
                  <h3>{familyName[1]} No {familyID[1]}</h3>
              </button>
              <button onClick ={this.handleClick(true,familyID[2])}>
                  <img src = {familyPhoto[2]} alt = {familyName[2]}/> 
                  <h3>{familyName[2]} No {familyID[2]}</h3>
              </button>
              <button onClick ={this.handleClick(true,familyID[3])}>
                  <img src = {familyPhoto[3]} alt = {familyName[3]}/> 
                  <h3>{familyName[3]} No {familyID[3]}</h3>
              </button>
            </div>
          )
          }            
      }   
    }

}

//<img src = {familyMember1[2]}/> <img src = {familyMember2[2]}/> <img src = {familyMember3[2]}/>
export default App;
