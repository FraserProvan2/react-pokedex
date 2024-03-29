import React, { Component } from "react";
import MovesModal from "./_MovesModal";
import Utility from "../../helpers/Utility";

// Models
import PokemonData from "../../models/PokemonData";
import PokemonSpeciesData from "../../models/PokemonSpeciesData";

interface Props {
  pokemonData: PokemonData;
  PokemonSpeciesData: PokemonSpeciesData;
  shiny: any;
}

interface State {
  showModal: boolean;
}

class PokemonInfo extends Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      showModal: false
    };
  }

  render(): JSX.Element {
    return (
      <div className="card">
        <div className="card-body">
          {/* Pokemon Profile (Image and Name) */}
          <div className="row mb-3">
            <div className="col-md-12 text-center">
              {this.renderPokemonProfile()}
            </div>
          </div>

          {/* Information */}
          <div className="row">
            <div className="col-md-6 mb-3">
              {this.renderDescription()}
              <MovesModal pokemonData={this.props.pokemonData} />
            </div>
            <div className="col-md-6 mb-3">{this.renderBaseStats()}</div>
          </div>
        </div>
      </div>
    );
  }

  renderPokemonProfile(): JSX.Element {
    let pokemon_name_class = "";
    if (this.props.shiny) {
      pokemon_name_class += "pokemon-title-shiny";
    }

    return (
      <div className="pokemon-info-box">
        <img
          className="pokemon-img anim-move"
          src={
            this.props.shiny
              ? this.pokemon().sprites.front_shiny
              : this.pokemon().sprites.front_default
          }
          alt="pokemon-sprite"
        />
        <h3 className={pokemon_name_class}>
          <span className="pokemon-index h5">#{this.pokemon().id}</span>{" "}
          {Utility.ucFirst(this.pokemon().name)}
        </h3>

        {/* Types */}
        {this.renderType(1) ? this.renderType(1) : null}
        {this.renderType(0) ? this.renderType(0) : null}
      </div>
    );
  }

  renderType = (slot: number): JSX.Element | null => {
    if (Utility.isset(this.pokemon().types[slot])) {
      let type = this.pokemon().types[slot].type.name;
      return (
        <span className={"type-icon " + type}>{Utility.ucFirst(type)}</span>
      );
    }
    return null;
  };

  renderDescription(): JSX.Element {
    let entries = this.props.PokemonSpeciesData.flavor_text_entries;
    let description = null;

    entries.forEach(descObj => {
      if (descObj.language.name === "en") {
        description = descObj.flavor_text;
      }
    });

    return (
      <div>
        <h6>Description</h6>
        <div className="pokemon-description p-3 mb-2">
          {/* Description */}
          <small>"{description}"</small>

          <hr />

          {/* Height/Weight */}
          <div className="small text-center">
            Height: {this.pokemon().height}
            <span className="measurement">hg</span>, Weight:{" "}
            {this.pokemon().weight}
            <span className="measurement">dm</span>
          </div>
        </div>
      </div>
    );
  }

  renderBaseStats(): JSX.Element {
    let stats = this.pokemon().stats;
    return (
      <div>
        <h6>Base Stats</h6>
        <ul className="list-group">
          {stats.map(function(name, index) {
            return (
              <li
                className="list-group-item d-flex justify-content-between align-items-center border-white px-0"
                key={index}
              >
                {Utility.ucFirst(name.stat.name)}
                <span className="badge badge-primary badge-pill w-25">
                  {name.base_stat}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  pokemon() {
    return this.props.pokemonData;
  }
}

export default PokemonInfo;
