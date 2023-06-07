import React, { useContext } from 'react';
import { HighLowGameContext } from '../App';

const Card = ({ card, cardBackImage }) => {
    const { CARD_IMAGE_PATH } = useContext(HighLowGameContext);

    return (
        <div className="card-wrapper">
            <div className={`card ${card !== cardBackImage && 'flipped'}`}>
                <div className="card-back">
                    <img src={`${CARD_IMAGE_PATH + cardBackImage}.png`} alt="" />
                </div>
                <div className="card-front">
                    <img src={`${CARD_IMAGE_PATH + card}.png`} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Card;
