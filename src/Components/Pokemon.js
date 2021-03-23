import React from 'react';
import { Link } from 'react-router-dom';

export const Pokemon = ({pokemonData, myPokemonList}) => {
    const ownedPokemon = () => {
        var nicknameLength = myPokemonList.find(myPokemon => myPokemon.name === pokemonData.name) 
        return(
            nicknameLength ? (
                <h6 className="ownedPokemon">You already have <b>{nicknameLength.nickName.length}</b> Pokémon</h6>
            ):(
                <h6 className="ownedPokemon">You already have <b>0</b> Pokémon</h6>
            )
        )
    }

    return(
        <div className="col-md-4">
            <Link to={{ pathname: "/pokemonDetail/" + pokemonData.name, state: pokemonData.image}} style={{textDecoration:'none'}}>                
                 <div className="card">
                    <img className="card-img img-fluid" src={pokemonData.image} alt={pokemonData.name} />
                    <div className="container card-body">
                        <h5>
                            {pokemonData.name}
                        </h5>
                        {                            
                           ownedPokemon()
                        }
                        
                    </div>
                </div>
            </Link>
        </div>
    )
}














        // <div className='pokemon'>
        //     <div className="pokemon__image">
        //         <img src={pokemonData.image} alt={pokemonData.name} />
        //     </div>
        //     <div className="pokemon__name">
        //         <strong>{pokemonData.name}</strong>
        //     </div>
        // </div>

        