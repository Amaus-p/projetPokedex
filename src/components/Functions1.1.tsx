
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


    export function getPokeSpeciesData (ID : number | string, familyData : Array<object>) {
        return(
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${ID}/`)
          .then((response) => {
            return response.json();
          })          
          .then((data) => {
              let url = data.evolution_chain.url;    //gives the url of the evolution chain in order to make the 
              return(fetch(url)
              .then((response) => {
                return response.json();
              })          
              .then((data) => {
                
                return([url, getFamilyInfos(data, familyData)] )
             
            }))
        }))
      }
      //familyUrl
      
    export function getFamilyInfos (data : any, familyData : Array<object>) {
        let okData=false
        let exit = false;                              // exit the loop when we have found every pokemon in the family
        let name :string = data.chain.species.name;
        data = data.chain.evolves_to; 
        let ID, photo;
        debugger
        
        getFamilyPokeInfos (name).then(
            data => (ID = data[0], photo=data[1], okData=data[2]));

        
        console.log(okData)
        if (okData){
          console.log(1)
          console.log(name, photo, ID)
          familyData.push({'name' : name, 'photo' : photo, 'ID' : ID})
          console.log(familyData)
          okData=false;
          while (!exit){
            //familyNames.push(name);         
            if (data.length!==undefined && data.length !== 0){
              for (let i=0; i<data.length; i++){
                name = data[i].species.name;
                getFamilyPokeInfos (name).then(data => (ID = data[0], photo=data[1], okData=data[2]));
                familyData.push({'name' : name, 'photo' : photo, 'ID' : ID})
              }
              data=data[0].evolves_to;
            }
            else {
              exit = true
              return(false)
            }
                
          }
        }
        

      }
      //changes familyName put in entry

    export function getFamilyPokeInfos (name:string) {
      return(
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
          .then((response) => {
            return response.json();
          })          
          .then((data) => { 
            return([data.id, data.sprites.front_default, true])
                
         }))
      }   
      //changes familyID and familyPhoto

      

