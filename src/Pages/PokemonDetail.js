import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { GetPokemonDetail } from '../GraphQL/GetPokemonDetail';
import { MoveCarousel } from '../Components/MoveCarousel';
import { PokemonModal } from '../Components/Modal';
import swal from 'sweetalert';
import '../Styles/PokemonDetail.css';
import { Loading } from '../Components/Loading';
import { ErrorPage } from '../Components/ErrorPage';


export const PokemonDetail = (props) => {
    const [isShow, setIsShow] = useState(false);

    let pokemonName = props.match.params.name;
    pokemonName = pokemonName[0].toUpperCase() + pokemonName.slice(1);

    const catchPokemon = (catchedPokemonName) => {
        let rand = Math.random()*100;
        if(rand > 50){
            setIsShow(true);
        }else{
            swal("OH NO!", catchedPokemonName+" Got Away... Let's Try Again!", "error");
        }
    };

    const { loading, error, data} = useQuery(GetPokemonDetail, {
        variables: { name:props.match.params.name }
    });

    if (loading) return <Loading/>;
    if (error) return <ErrorPage />;

    return(
        <div className='col-md-12'>
            <div className='row'>
                <div className="col-md-6 text-center animation">
                    <img className="imgPokemon" src={props.location.state} alt={pokemonName}/>
                </div>
                <div className='col-md-5'>
                    <div className='description'>
                        <Link to='/' className='btnBack'> Back</Link>
                        <h4 className="pokemonName">{pokemonName}</h4>
                        <p className="pokemonAttribute">Ability:</p>
                        <div className= "text-center mb-4">
                        {
                            data.pokemon.types.map(
                                (poke, key) => <h6 key={poke.type.name+key} className="pokemonType">{poke.type.name}</h6>)
                        }
                        </div>
                        <p className="pokemonAttribute">Moves: </p>
                        {
                            <MoveCarousel pokemonMoves={data.pokemon.moves}/>
                        }
                        <button className='btn-success btn-catch' onClick={() => catchPokemon(pokemonName)}>Catch</button>
                        <div>
                            <PokemonModal
                                show={isShow}
                                onHide={setIsShow}
                                catchedpokemonname={pokemonName}
                                id={data.pokemon.id}
                                name={data.pokemon.name}
                                img={props.location.state}
                            />
                        </div>
                        <span class="how-to-play" data-tooltip="Try to click the catch button around pokemon to catch Pokémon" data-tooltip-position="bottom">How to catch ? </span>
                    </div>
                </div>
            </div>
        </div>
    )
}