import React, {Component} from 'react';

import '../App.css';

interface Props {
    ID: string;
    handleClick: (change?: boolean, id?: React.Key) => () => void;
    handleChange: (input: string | number) => (event: any) => void;
  }

  class Initialisation extends Component<Props> {
    render() {
      const { ID, handleClick, handleChange } = this.props;
      return (
        <div style={{ textAlign: "center" }}>
          <h1> Pokédex </h1> <br />
          <input
            type="text"
            placeholder="Entrez le nom ou numéro de votre pokémon"
            value={ID}
            onChange={handleChange("ID")}
          />
          <button onClick={handleClick()}>Rechercher</button>
        </div>
      );
    }
  }
  
  export default Initialisation;