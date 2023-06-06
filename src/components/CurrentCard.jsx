import React, { useContext } from 'react';
import { CardContext } from '../App';

const CurrentCard = () => {
    const { CARD_IMAGE_PATH, currentCardImage } = useContext(CardContext);

    return (
        <section>
            <img
                className="inline min-h-full w-48 shadow md:w-56"
                src={`${CARD_IMAGE_PATH + currentCardImage}.png`}
                alt=""
                data-testid="currentCard"
            />
        </section>
    );
};

export default CurrentCard;
