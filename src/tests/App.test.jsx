import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import Game from '../pages/Game';

describe('Game', () => {
    test('Play button is displayed and be enabled', () => {
        render(<Game />);
        const playButtonEl = screen.getByRole('button', { name: /^play$/i });

        expect(playButtonEl).toBeInTheDocument();
        expect(playButtonEl).toBeEnabled();
    });

    test('Current card is shown', () => {
        render(<Game />);
        const currentCard = screen.getByTestId('currentCard');
        expect(currentCard).toBeInTheDocument();
    });

    test('5 cards to guess are shown', () => {
        const { container } = render(<Game />);
        const cardsToGuess = container.getElementsByClassName('card-wrapper');

        expect(cardsToGuess).toHaveLength(5);
    });

    test('Game Stats section is shown', () => {
        render(<Game />);
        const gameStats = screen.getByTestId('gameStats');
        expect(gameStats).toBeInTheDocument();
    });

    test('Reset Game Stats button is displayed and be enabled', () => {
        render(<Game />);
        const resetGameStatsButtonEl = screen.getByRole('button', { name: /^reset game stats$/i });

        expect(resetGameStatsButtonEl).toBeInTheDocument();
        expect(resetGameStatsButtonEl).toBeEnabled();
    });

    test('Lower and Higher buttons are not displayed', () => {
        render(<Game />);
        const lowerButtonEl = screen.getByRole('button', { name: /^lower$/i });
        const higherButtonEl = screen.getByRole('button', { name: /^higher$/i });

        expect(lowerButtonEl).toHaveClass('hidden');
        expect(higherButtonEl).toHaveClass('hidden');
    });

    test('Result modal is not displayed', () => {
        render(<Game />);
        const revealEl = screen.getByTestId('result');
        expect(revealEl).not.toHaveClass('reveal');
    });

    test('Play button starts the game', () => {
        render(<Game />);
        const playButtonEl = screen.getByRole('button', { name: /^play$/i });

        fireEvent.click(playButtonEl);

        const lowerButtonEl = screen.getByRole('button', { name: /^lower$/i });
        const higherButtonEl = screen.getByRole('button', { name: /^higher$/i });
        const currentCardNumberEl = screen.getByTestId('currentCardNumber');
        const resetGameStatsButtonEl = screen.getByRole('button', {
            name: /^reset game stats$/i,
        });

        expect(playButtonEl).toBeDisabled;
        expect(playButtonEl).toHaveClass('hidden');
        expect(lowerButtonEl).toBeInTheDocument();
        expect(higherButtonEl).toBeInTheDocument();
        expect(currentCardNumberEl.textContent).toMatch('1/5');
        expect(resetGameStatsButtonEl).toBeDisabled();
    });
});
