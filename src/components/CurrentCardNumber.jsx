import React, { useContext } from 'react';
import { HighLowGameContext } from './Game';

const CurrentCardNumber = ({ totalCardsToPlay }) => {
    const { currentCardNumber, isGameStarted } = useContext(HighLowGameContext);

    return (
        <div
            className={`text-2xl ${!isGameStarted && 'invisible'}`}
            data-testid="currentCardNumber"
        >{`${currentCardNumber}/${totalCardsToPlay}`}</div>
    );
};

export default CurrentCardNumber;
