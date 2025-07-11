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

    useEffect(() => {
        const cardValue = cardItems.map((value, index) => ({
            id: index,
            value: value,
            visible: false
        }));

        setCards(cardValue);
        setExpectedNext(1);
    }, []);

    return (
        <div className="game-container">
        <div className="left-section">
            <div className="game-board">
                {/* Dynamically create cards */}
                { cards.map((card) => (
                    <Card key={card.id} value={card.value} visible={card.visible} />
                ))}
            </div>
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
