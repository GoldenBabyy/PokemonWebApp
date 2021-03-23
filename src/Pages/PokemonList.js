import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GetPokemon } from '../GraphQL/GetPokemon';
import { Pokemon } from '../Components/Pokemon';
import { Loading } from '../Components/Loading';
import { ErrorPage } from '../Components/ErrorPage';
import '../Styles/styleList.css';


export const PokemonList = () => {
    const [limitPokemon, setLimitPokemon] = useState(9);
    const [myPokemonList, setMyPokemonList] = useState([]);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('myPokemon')) || [];
        setMyPokemonList(data);
    }, []);
    
    const { loading, error, data, fetchMore} = useQuery(
        GetPokemon, 
        {
            variables: { limit: limitPokemon, offset: 0},
            fetchPolicy: "cache-and-network"
    });

    const onLoadMore = (lmt) => {
        fetchMore({
            variables: {
                offset: lmt
            }
        });
        setLimitPokemon(lmt);
    }

    if (loading) return <Loading/>;
    if (error) return <ErrorPage />;

    return (
        <>
            <div className='container col-md-11'>
                <h1 className="title">CATCH ME!</h1>
                <p className="subtitle">Let's choose me (Pokémon) and catch me!</p>
                <div className='row'>
                    {data.pokemons.length === 0 ? 
                        ( 
                            <p className="text-white center text-danger"> No Pokémon Available</p> 
                        ) : ( 
                            data.pokemons.results.map(
                                (pokemon, id) => 
                                    <Pokemon id={id} key={id} pokemonData={pokemon} myPokemonList={myPokemonList}/>
                            )
                        )
                    }
                    <div className="col-md-12">
                        <button className="btn btn-success loadmore" onClick={() => onLoadMore(limitPokemon+9)}> Load More... </button>
                    </div>
                </div>
            </div>
        </>
    )
}