import React, { useContext } from 'react';
import { CardContext } from '../App';

const Cards = () => {
    const { CARD_BACK_IMAGE, CARD_IMAGE_PATH, cardImages } = useContext(CardContext);

    const cardBackImageFile = `${CARD_IMAGE_PATH + CARD_BACK_IMAGE}.png`;

    return (
        <div className="grid grid-cols-5 gap-x-2 md:gap-x-8 lg:gap-x-16">
            <div className="card-wrapper">
                <div className={`card ${cardImages[0] && 'flipped'}`}>
                    <div className="card-back">
                        <img src={`${cardBackImageFile}`} alt="" />
                    </div>
                    <div className="card-front">
                        <img src={`${CARD_IMAGE_PATH}${cardImages[0] || CARD_BACK_IMAGE}.png`} alt="" />
                    </div>
                </div>
            </div>
            <div className="card-wrapper">
                <div className={`card ${cardImages[1] && 'flipped'}`}>
                    <div className="card-back">
                        <img src={`${cardBackImageFile}`} alt="" />
                    </div>
                    <div className="card-front">
                        <img src={`${CARD_IMAGE_PATH}${cardImages[1] || CARD_BACK_IMAGE}.png`} alt="" />
                    </div>
                </div>
            </div>
            <div className="card-wrapper">
                <div className={`card ${cardImages[2] && 'flipped'}`}>
                    <div className="card-back">
                        <img src={`${cardBackImageFile}`} alt="" />
                    </div>
                    <div className="card-front">
                        <img src={`${CARD_IMAGE_PATH}${cardImages[2] || CARD_BACK_IMAGE}.png`} alt="" />
                    </div>
                </div>
            </div>
            <div className="card-wrapper">
                <div className={`card ${cardImages[3] && 'flipped'}`}>
                    <div className="card-back">
                        <img src={`${cardBackImageFile}`} alt="" />
                    </div>
                    <div className="card-front">
                        <img src={`${CARD_IMAGE_PATH}${cardImages[3] || CARD_BACK_IMAGE}.png`} alt="" />
                    </div>
                </div>
            </div>
            <div className="card-wrapper">
                <div className={`card ${cardImages[4] && 'flipped'}`}>
                    <div className="card-back">
                        <img src={`${cardBackImageFile}`} alt="" />
                    </div>
                    <div className="card-front">
                        <img src={`${CARD_IMAGE_PATH}${cardImages[4] || CARD_BACK_IMAGE}.png`} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cards;
