import React, { useContext } from 'react';
import { HighLowGameContext } from '../App';

const CurrentCardNumber = () => {
    const { TOTAL_CARDS_TO_PLAY, currentCardNumber, isGameStarted } = useContext(HighLowGameContext);

    return (
        <div
            className={`text-2xl ${!isGameStarted && 'invisible'}`}
            data-testid="currentCardNumber"
        >{`${currentCardNumber}/${TOTAL_CARDS_TO_PLAY}`}</div>
    );
};

export default CurrentCardNumber;
