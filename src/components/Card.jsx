import React, { useContext } from 'react';
import { CardContext } from '../App';

const Card = ({ card }) => {
    const { CARD_IMAGE_PATH, CARD_BACK_IMAGE } = useContext(CardContext);

    return (
        <div className="card-wrapper">
            <div className={`card ${card !== CARD_BACK_IMAGE && 'flipped'}`}>
                <div className="card-back">
                    <img src={`${CARD_IMAGE_PATH + CARD_BACK_IMAGE}.png`} alt="" />
                </div>
                <div className="card-front">
                    <img src={`${CARD_IMAGE_PATH + card}.png`} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Card;
