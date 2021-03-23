import React from 'react';
import { Navbar, Nav} from 'react-bootstrap';
import '../Styles/Header.css';

export const Header= () => {
    return(
        <>
            <Navbar className="nav-bar" variant="light">
                <Navbar.Collapse className='m-0'>
                    <Nav className='animated bounce'>
                        <Nav.Link href='/' className='mb-0 justify-center align-center'>
                            <img
                                alt="Logo"
                                src="/Assets/logoPokemon.png"
                                width="50"
                                className="d-inline-block float-left m-0"
                            />
                            <h4 className='ml-5 pl-3 titleNav'>CATCH ME!</h4>
                        </Nav.Link>
                    </Nav>
                    <Nav.Link href='/MyPokemonList' className='ml-auto link'>My Pokémon List</Nav.Link>
                    </Navbar.Collapse>
            </Navbar>
        </>
    )
}