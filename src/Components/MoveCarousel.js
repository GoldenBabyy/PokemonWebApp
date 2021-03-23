import { Carousel } from 'react-bootstrap';
import React from 'react';
import "../Styles/Carousel.css";

export const MoveCarousel= (props) => {
    
    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 550, itemsToShow: 2, itemsToScroll: 2 },
        { width: 768, itemsToShow: 3 },
        { width: 1200, itemsToShow: 4 }
    ];

    return(
        <div className="mt-2 m-0 text-center">
            <Carousel breakpoints={breakPoints}>
            {
                props.pokemonMoves.map((itemMove, id) => (
                    <Carousel.Item key={itemMove.move.name+id}>
                        <p className="moveName">{itemMove.move.name}</p>
                    </Carousel.Item>
                    )
                )
            }
            </Carousel>
        </div>
    )
}