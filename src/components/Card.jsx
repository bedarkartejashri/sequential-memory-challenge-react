//   ==========================================================================
//   Component: Card.vue
//   Description: Single card component. Handles flip animation and emits 
//                events on user selection.
//   Author: Tejashri Bedarkar
//   Created: 2025-07-11
//   Last Updated: 2025-07-11
//   ==========================================================================

import '../css/Card.css';

export default function Card({
    id,
    value,
    visible,
    disabled,
    onClick
}) {
    /**
    * Emits an event when the card is clicked
    * Passes its id and value to the parent
    */
    const chooseCard = () => {
        if (!disabled && !visible) {
            onClick({ id, value });
        }
    }

    return (
        <div className={`card ${visible ? 'is-flipped' : ''}`} onClick={chooseCard}>
            {/* front side of the card, shows the numbers */}
            <div className="card-side is-front">
                <h2 className="card-number"> {value} </h2>
            </div>
            {/* Back side of the card */}
            <div className="card-side is-back">  </div>
        </div>
    )
}