import React, { useContext } from 'react';
import { HighLowGameContext } from '../pages/Game';

const CurrentCard = ({ currentCardImage }) => {
    const { CARD_IMAGE_PATH } = useContext(HighLowGameContext);

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
