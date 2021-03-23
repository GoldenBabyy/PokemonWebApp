import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import {cloneDeep} from 'lodash';
import '../Styles/myPokemonList.css';

export const MyPokemonList = () => {
    const [myPokemonList, setMyPokemonList] = useState([]);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('myPokemon')) || [];
        setMyPokemonList(data);
    }, []);

    const confirm = (nicknamePokemon) => {
        nicknamePokemon = nicknamePokemon[0].toUpperCase() + nicknamePokemon.slice(1);
        swal({
            title: "Are you sure?",
            text: "Once released, you will not be able to recover " + nicknamePokemon + "!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willRelease) => {
        if (willRelease) {
            release(nicknamePokemon);
            swal("Poof! Your pokemon named " + nicknamePokemon + " has been released!", {
            icon: "success",
            });
        } else {
            swal("", "Your pokemon named " + nicknamePokemon + " is safe!", "info");
        }
        });
    }

    const release = (nicknamePokemon) => {
        var temp = cloneDeep(myPokemonList);
        temp.map((myPokemon, id) => {
            let index = myPokemon.nickName.findIndex(nickname => nickname === nicknamePokemon.toLowerCase())
            if(index > -1){
                myPokemon.nickName.splice(index, 1);
            }
            if(myPokemon.nickName.length === 0){
                temp.splice(id, 1);
            }
        })
        localStorage.setItem('myPokemon', JSON.stringify(temp));
        setMyPokemonList(temp);
    };

    return(
        <div>
            <h1 className="title-pokemonlist">My Pokémon List!</h1>
            <p className="subtitle">List of your Pokémon</p>
            {
                myPokemonList.length === 0 ?
                    (
                        <>
                            <p className="text-center text-danger alert"> You don't have any Pokémon caught yet</p> 
                            <p className="subtitle-alert">Let's choose me (Pokémon) and catch me!</p>
                        </>
                    ) : 
                    ( 
                        myPokemonList.map((myPokemon, index) => (
                            <ul className="list-group" key={myPokemon.name+index}>
                                {
                                    myPokemon.nickName.map((nickname, id) =>
                                        <li key={nickname+id}>
                                            <img className="avatar" src={myPokemon.img} alt="imgPokemon"/>
                                            <span className="myPokemon">
                                                <span className="nickname">{nickname}</span>
                                                <span className="name">{myPokemon.name}</span>
                                            </span>
                                            <span className="delete">
                                                <button type="button" className="close" aria-label="Close" onClick={() => confirm(nickname)}>
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </span>
                                        </li>
                                    )
                                }
                            </ul>)
                        )
                    )
            }
            <Link to="/" className="btn btn-success back">Back to Home</Link>
        </div>
    );
}