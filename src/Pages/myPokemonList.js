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

    const confirm = (nicknamePokemon, id) => {
        nicknamePokemon = nicknamePokemon[0].toUpperCase() + nicknamePokemon.slice(1);
        swal({
            title: "Are you sure?",
            text: "Once released, you will not be able to recover " + nicknamePokemon + "!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            closeOnClickOutside: false,
            closeOnEsc: false,
        })
        .then((willRelease) => {
        if (willRelease) {
            release(nicknamePokemon, id);
            swal("Poof! Your pokemon named " + nicknamePokemon + " has been released!", {
                icon: "success", 
                buttons: false,
                timer: 2500,
                closeOnClickOutside: false,
                closeOnEsc: false,
            });
        } else {
            swal("", "Your pokemon named " + nicknamePokemon + " is safe!", "info", 
            {
                button: {
                    text: "OK",
                    value: true,
                    visible: true,
                    className: "btn btn-success btn-alert",
                    closeModal: true
                },
                closeOnClickOutside: false,
                closeOnEsc: false,
            });
        }
        });
    }

    const release = (nicknamePokemon, id) => {
        var temp = cloneDeep(myPokemonList);
        let pokemonId = temp.findIndex(myPokemonId => id === myPokemonId.id)
        let nicknameId = temp[pokemonId].nickName.findIndex(myPokemonNickname => nicknamePokemon.toLowerCase() === myPokemonNickname)
        temp[pokemonId].nickName.splice(nicknameId, 1);

        if(temp[pokemonId].nickName.length === 0){
            temp.splice(pokemonId, 1);
        }

        localStorage.setItem('myPokemon', JSON.stringify(temp));
        setMyPokemonList(temp);
    };

    return(
        <div>
            <h1 className="title-pokemonlist">My Pokémon List!</h1>
            <p className="subtitle">List of your Pokémon(s)</p>
            {
                myPokemonList.length === 0 ?
                    (
                        <>
                            <p className="text-center text-danger alert"> You don't have any Pokémon caught yet</p> 
                            <p className="subtitle-alert">Click back to home button below to catch a Pokémon</p>
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
                                                <span className="nickname">{nickname[0].toUpperCase() + nickname.slice(1)}</span>
                                                <span className="name">{myPokemon.name[0].toUpperCase() + myPokemon.name.slice(1)}</span>
                                            </span>
                                            <span className="delete">
                                                <button type="button" className="close" aria-label="Close" onClick={() => confirm(nickname, myPokemon.id)}>
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