
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


    export function getPokeCaracteristics (id : number |string) {
      return(
        fetch(`https://pokeapi.co/api/v2/characteristic/${id}/`)
        .then((response) => {
          return response.json();
        })          
        .then((data) => {if (data!==undefined) {
          return (data.descriptions[0].description)}}))
      }

      //pokeDescription 
      
    
      export function getPokeSpeciesData (ID : number | string) {
        return(
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${ID}/`)
          .then((response) => {
            return response.json();
          })          
          .then((data) => {            
              let familyUrl : string = data.evolution_chain.url
              return(fetch(familyUrl)
              .then((response) => {
                return response.json();
              })          
              .then((data) => {return(
             getFamilyInfos (data))
            })
        )}))
      }
      
      export function getFamilyInfos (data : any) {
        
        let exit = false;                              // exit the loop when we have found every pokemon in the family
        let pokeFamilyInfo : Array<Map<string,number|string>> = [];
        let name :string = data.chain.species.name;
        data = data.chain.evolves_to; 
        getFamilyPokeInfos(name)
          .then(newMap => 
                {console.log(pokeFamilyInfo.concat([newMap]))
                pokeFamilyInfo = pokeFamilyInfo.concat([newMap])
                console.log(pokeFamilyInfo)
                }
              )
              console.log('gege')
              console.log(pokeFamilyInfo)
        while (!exit){
         
          if (data.length!==undefined && data.length !== 0){
            for (let i=0; i<data.length; i++){
              name = data[i].species.name;
              getFamilyPokeInfos(name)
                .then(newMap => 
                  {console.log(newMap)
                  pokeFamilyInfo= pokeFamilyInfo.concat([newMap])}
              );
              }
            
            data=data[0].evolves_to;
          }
          else {
            exit = true                
        }
      }
      console.log(pokeFamilyInfo)
      return(pokeFamilyInfo)
      }
      
    export function getFamilyPokeInfos (name:string) {
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

