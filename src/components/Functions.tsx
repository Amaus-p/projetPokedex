import React from 'react';


    // in tsx arguments' type have to be indicated in the brackets
    export function getPokeData (ID : number | string) {
      return(
        fetch(`https://pokeapi.co/api/v2/pokemon/${ID}/`)
        .then((response) => {
          return response.json();
        })          
        .then((data) => {return ([data.id, data.name.toUpperCase(), data.types[0].type.name,data.abilities[0].ability.name,
            data.abilities[1].ability.name, data.species.name, data.height/10, data.weight / 10,data.sprites.back_default,
            data.sprites.front_default, false])
        }))}

        /*ID/pokeId, pokeName , ability1, ability2, poketype pokeAbility1 : data.abilities[0].ability.name, pokeAbility2 
          pokeCategory, pokeHeight, pokeWeight, pokePhotoBack , pokePhotoFront , Next ,
          */
         //there was a call of get getPokeCaracteristics


    export function getPokeCaracteristics (id : number) {
        fetch(`https://pokeapi.co/api/v2/characteristic/${id}/`)
        .then((response) => {
          return response.json();
        })          
        .then((data) => {return (data.descriptions[0].description)})
      }

      //pokeDescription 


    export function getPokeSpeciesData (ID : number | string, familyNames : Array<string>, 
        familyPhotos : Array<string>, familyIDs: Array<number>) {
        
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${ID}/`)
          .then((response) => {
            return response.json();
          })          
          .then((data) => {
              let url = data.evolution_chain.url;    //gives the url of the evolution chain in order to make the 
              fetch(url)
              .then((response) => {
                return response.json();
              })          
              .then((data) => {
             return(url)
            })
        })
      }
      //familyUrl
      
    export function getFamilyInfos (data : any, familyNames : Array<string>, 
        familyPhotos : Array<string>, familyIDs: Array<number>) {
        
        let exit = false;                              // exit the loop when we have found every pokemon in the family
        let name :string = data.chain.species.name;
        data = data.chain.evolves_to; 
        getFamilyPokeInfos (name, familyPhotos, familyIDs);
        while (!exit){
          familyNames.push(name);         
          if (data.length!=undefined && data.length != 0){
            for (let i=0; i<data.length; i++){
              name = data[i].species.name;
              getFamilyPokeInfos (name, familyPhotos, familyIDs);
            }
            data=data[0].evolves_to;
          }
          else {
            exit = true
          }
                
        }

      }
      //changes familyName put in entry

    export function getFamilyPokeInfos (name:string, familyPhotos : Array<string>, familyIDs: Array<number>) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
          .then((response) => {
            return response.json();
          })          
          .then((data) => {
            familyIDs.push(data.id);
            familyPhotos.push(data.sprites.front_default);            
         })
      }   
      //changes familyID and familyPhoto

      

