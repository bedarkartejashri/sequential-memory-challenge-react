// ==========================================================================
//   Component: GameBoard.vue
//   Description: A memory matching game board with card flipping logic.
//   Author: Tejashri Bedarkar
//   Created: 2025-07-11
//   Last Updated: 2025-07-11
// ==========================================================================

import { useEffect, useState } from 'react';
import '../css/GameBoard.css'
import Card from './card';

export default function GameBoard () {
    // Card items
    const cardItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    const [cards, setCards] = useState([]);
    const [expectedNext, setExpectedNext] = useState(1);
    const [gameStatus, setGameStatus] = useState('');
    const [disableClick, setDisableClick] = useState(false);

    useEffect(() => {
        resetGame();
    }, []);

    /**
     * Shuffles the cards randomly
     */
    const shuffleCards = (cardItems) => {
        return cardItems.sort(() => Math.random() - 0.5);
    }

    /**
     * Resets the entire game:
     * - enables card clicks
     * - shuffles the cards
     * - resets
     */
    const resetGame = () => {
        const shuffle = shuffleCards(cardItems);

        const cardValue = shuffle.map((value, index) => ({
            id: index,
            value: value,
            visible: false
        }));

        setCards(cardValue);
        setExpectedNext(1);
        setGameStatus('');
        setDisableClick(false);
    }

    /**
     * Handles Flip Card Event.
     * @param clickedCard - information of clicked card.
     */
    const flipCard = (clickedCard) => {
        if (disableClick) return;
        
        // if already flipped, ignore
        if (clickedCard.visible) return;

        // Allow flipping
        const flippedCards = cards.map((card) =>
            card.id === clickedCard.id ? { ...card, visible: true } : card
        );
        setCards(flippedCards);

        if (clickedCard.value === expectedNext) {
            const next = expectedNext + 1;
            setExpectedNext(next);

            if (next > cardItems.length) {
                setGameStatus('You Win!');
                setDisableClick(true);
            }
        } else {
            setDisableClick(true);
            setTimeout(() => {
                const flipBackCards = cards.map((card) => ({ ...card, visible: false }));
                setCards(flipBackCards);
                setExpectedNext(1);
                setGameStatus('');
                setDisableClick(false);
            }, 500);
        }
    }

    return (
        <div className="game-container">
        <div className="left-section">
            <div className="game-board">
                {/* Dynamically create cards */}
                { cards.map((card) => (
                    <Card key={card.id} value={card.value} visible={card.visible} onClick={() => flipCard(card)} />
                ))}
            </div>
            {/* Show the game status and a reset button */}
            <h3>{ gameStatus }</h3>
            <button id="reset_button" onClick={resetGame}>Reset Game</button>
        </div>

        <div className="right-section">
            {/* Game Instructions */}
            <h2>How to Play</h2>
            <ul>
                <li>Click a card to reveal its number.</li>
                <li>You must reveal numbers in order from 1 to 12.</li>
                <li>If you click a wrong number, all cards will hide and you must start again from 1.</li>
                <li>Try to finish the sequence to win!</li>
            </ul>
        </div>
    </div>
    );
}
