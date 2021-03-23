import React, {useState} from 'react';
import { Modal } from 'react-bootstrap';
import swal from 'sweetalert';

export const PokemonModal = (props) => {
    const [nickname, setNickname] = useState('');

    const handleChange = (event)  => {
        setNickname(event.target.value);
    }
    
    const handleSubmit = () => {
        let myPokemonData = JSON.parse(localStorage.getItem('myPokemon')) || [];
        let diffData = true;
        let validData = true;
        var BreakException= {};
        let arrData= 
        {
            id: props.id,
            name: props.name,
            nickName: [nickname],
            img: props.img
        }

        if(nickname !== ''){   
            if(myPokemonData.length>0){
                try{
                    myPokemonData.forEach((myPokemon, index) => {
                        if(myPokemon.id === props.id){
                            myPokemon.nickName.forEach((pokemonNickname, index) => {
                                if(pokemonNickname === nickname.toLowerCase()){
                                    console.log('nickname sama');
                                    validData = false;
                                    throw BreakException;
                                }else{
                                    diffData=false;
                                    console.log('nickname beda');
                                }
                            });
                        }
                    });    
                } catch(e){
                    if(e !== BreakException) 
                        throw e;
                }
            }
        }else{
            validData = false;
        }

        if(validData){
            if(diffData){
                myPokemonData.push(arrData);
                localStorage.setItem('myPokemon', JSON.stringify(myPokemonData));
            }else{
                myPokemonData.forEach((myPokemon, index) => {
                    if(myPokemon.id === props.id){
                        myPokemon.nickName.push(nickname);
                    }
                });
                localStorage.setItem('myPokemon', JSON.stringify(myPokemonData));
            }  
            props.onHide(false)
            swal("CONGRATULATIONS!", props.catchedpokemonname+" Caught and Named " + nickname + "!", "success");
            setNickname('');
        }else{
            swal("WARNING!", "The nickname cannot be empty or the nickname has been used...Please enter the nickname again!", "warning");
        }
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" className="modalTitle">
                    Congratulations {props.catchedpokemonname} Caught!
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="form-group">
                    <label className="m-0">Nickname</label>
                    <p className="subtitle-modal">Enter the nickname and click "Add to My Pokemon List" button to save the captured Pokemon </p>
                    <input type='text' className="form-control" name='nickname' placeholder={props.catchedpokemonname + "'s Nickname"} value={nickname} onChange={handleChange} required></input>
                    <button type='submit' className="btn btn-primary btnAdd" onClick={() => handleSubmit()}>Add to My Pokemon List</button>
                </div>
            </Modal.Body>
        </Modal>
    );
}