import React, { useContext } from 'react';
import { HighLowGameContext } from './Game';

const ButtonPlay = () => {
    const { currentCardNumber, handlePlayClick, isGameStarted } = useContext(HighLowGameContext);

    return (
        <button
            type="button"
            className={`btn ${isGameStarted && 'hidden'}`}
            value="play"
            disabled={currentCardNumber !== 0}
            onClick={() => handlePlayClick()}
        >
            Play
        </button>
    );
};

export default ButtonPlay;
