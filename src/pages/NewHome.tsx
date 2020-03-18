import React, {Component} from 'react';

import CircularProgress from '@material-ui/core/CircularProgress'

import Initialisation from '.././components/Initialisation';
import PokemonPrint from '.././components/NewPokemonPrint'

interface State{
  ID : string | number,                  //pokeName or pokeID
  pokeId : number ,
  pokeName : string ,
  pokeType : string,
  pokeCategory : string,
  pokeDescription: string,
  pokeHeight : string,
  pokeWeight : string,
  pokeAbility1 : string,
  pokeAbility2 : string,
  pokePhotoBack : string,
  pokePhotoFront : string,
  pokeFamilyData: Array<Map<string,any>>,      //list of the data of the pokemons--> dictionnaries as in App
  Next : boolean,
  init : boolean,
  loadedData : boolean,
  loadedFamilyData : boolean,
}

class App extends Component {
  
    state : Readonly<State> = {
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
      pokeFamilyData : [],
      Next : false,             //allows to stick to one pokemon in the pokedex
      init: false,              //clear the page if init = false
      loadedData : false,
      loadedFamilyData: false,
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
          loadedData : true,
          Next : false,
        })

        this.getPokeCaracteristics (this.state.pokeId) })
      }


      getPokeCaracteristics (id : number) {
        
        fetch(`https://pokeapi.co/api/v2/characteristic/${id}/`)
          .then((response) => {
            return response.json();
          })          
          .then((data) => 
            {this.setState({
              pokeDescription : data.descriptions[0].description,
            })
            })
      }


      getPokeSpeciesData = (ID : number | string) => {
        
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${ID}/`)
          .then((response) => {
            return response.json();
          })          
          .then((data) => {            
              let familyUrl : string = data.evolution_chain.url
              fetch(familyUrl)
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
        this.getFamilyPokeInfos(name)
          .then(newMap => 
            {
              this.setState({
                pokeFamilyData : this.state.pokeFamilyData.concat([newMap])
              })
          });
        
        
        while (!exit){
         
          if (data.length!==undefined && data.length !== 0){
            for (let i=0; i<data.length; i++){
              name = data[i].species.name;
              this.getFamilyPokeInfos(name)
                .then(newMap => 
                  this.setState({
                    pokeFamilyData : this.state.pokeFamilyData.concat([newMap])
                  }));
              }
            
            data=data[0].evolves_to;
          }
          else {
            exit = true                
        }
      }
    this.setState({
      loadedFamilyData : true
    })
      }
      
      getFamilyPokeInfos = (name:string) => {
        return(
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
          .then((response) => {
            return response.json();
          })          
          .then((data) => {
            let newMap= new Map();
            newMap.set("pokeName", name)
            newMap.set("pokeId", data.id)
            newMap.set("pokePhoto", data.sprites.front_default)
            return (newMap)}))
          
      }   


    //fx for binding set state of the ID when it the box is filled
    handleChange = (input : string | number) => (event : any) => {
        this.setState({[input]: event.target.value});
      };

    //fx to change the pokémon we are looking at in the pokedex on click
    handleClick = (change : boolean = false, id : string|number = '') => ()=> {

      if (change){                        //when we click on the button of a family member of {pokemonName},  
        this.setState ({                  //it changes the pokemon on which we are focused
          Next : !this.state.Next,
          ID : id,
          loadedData: false,
          loadedFamilyData: true,
          pokeDescription:'No description avalable',
        }) ;

      }
      else{
        this.setState ({
        Next : !this.state.Next,
        init : true,
        loadedData: false,
        loadedFamilyData: false,
        pokeDescription:'No description avalable',
        pokeFamilyData : [] }) ;
      }
    }

    render () {
     
      let {ID, pokeId, pokeName, pokeType, pokeAbility1, pokeAbility2, pokeCategory,pokeDescription, pokeHeight,pokeWeight, 
        pokePhotoBack, pokePhotoFront,Next,init,pokeFamilyData, loadedData, loadedFamilyData} = this.state;
      let values = {pokeId, pokeName, pokeType, pokeAbility1, pokeAbility2, pokeCategory,pokeDescription, pokeHeight,pokeWeight, 
        pokePhotoBack, pokePhotoFront,Next,init,pokeFamilyData, loadedData, loadedFamilyData}


      if (!init){
        return (
          <Initialisation
            ID= {ID}
            handleClick= {this.handleClick}
            handleChange= {this.handleChange}/>
        )
      }
      
      else {
        if (Next){
          if (!loadedData || ! loadedFamilyData){
            if (!loadedData){
              this.getPokeData(ID);
            }
            if (!loadedFamilyData){
              this.getPokeSpeciesData(ID)
            }
            
            return(
              <div className='Center'>
              <CircularProgress>
              </CircularProgress>
              </div>)
          }
          else{
            return(
              <PokemonPrint
              ID ={ID}
              values= {values}
              handleClick= {this.handleClick}
              handleChange= {this.handleChange}
              pokeFamilyData = {pokeFamilyData}
              />
            )
            }
          }

        else{
          return(
            <PokemonPrint
            ID ={ID}
            values= {values}
            handleClick= {this.handleClick}
            handleChange= {this.handleChange}
            pokeFamilyData = {pokeFamilyData}
            />
          )
          
        }
      }
    }
  }



//<img src = {familyMember1[2]}/> <img src = {familyMember2[2]}/> <img src = {familyMember3[2]}/>
export default App;
