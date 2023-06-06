import React, { useContext } from 'react';
import { HighLowGameContext } from '../App';

const CurrentCardNumber = () => {
    const { currentCardNumber, isGameStarted } = useContext(HighLowGameContext);

    return (
        <div
            className={`text-2xl ${!isGameStarted && 'invisible'}`}
            data-testid="currentCardNumber"
        >{`${currentCardNumber}/5`}</div>
    );
};

export default CurrentCardNumber;
