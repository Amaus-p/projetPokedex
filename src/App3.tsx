import React, {Component} from 'react';
import './App.css';
/*
import Initialisation from "./components/Initialisation";
import Pokemon from "./components/Pokemon";


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
          
      }    
  
    // in tsx arguments' type have to be indicated in the brackets
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
              pokePhotoBack, pokePhotoFront,Next,init,familyID,familyName,familyPhoto, } = this.state;
      let values = {pokeId, pokeName, pokeType, pokeAbility1, pokeAbility2, pokeCategory,pokeDescription, pokeHeight,pokeWeight, 
        pokePhotoBack, pokePhotoFront,Next,init,familyID,familyName,familyPhoto, }
      let {ID} = this.state;

      if (init===false) {
        return(
          <Initialisation
            ID ={ID}
            handleClick = {this.handleClick}
            handleChange = {this.handleChange}/>
          )
     }

      else if (init===true) {
        console.log("Next" + Next)
        console.log(familyName)
        console.log(familyID)
        console.log(familyPhoto)
        
        if (Next===true){
          this.getPokeData(ID);
          this.getPokeSpeciesData(ID);
        }
         return(
            <Pokemon 
              ID={ID}
              values = {values}
              handleClick = {this.handleClick}
              handleChange = {this.handleChange}
           />
            )
      }   
    }

}



//https://cdiese.fr/syntaxe-typescript-en-10-min/
export default App;
*/