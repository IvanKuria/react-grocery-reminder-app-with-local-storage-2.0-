import React from 'react';

function FoodCard(props) {
    return (
        <div className="food-card">
            <h2 className="food-title">{props.foodName}</h2>
            <div className="food-info">
                <div className="info-bubble cooked">
                    <h3>Cooked:</h3>
                    <p>{props.cookedDate}</p>
                </div>
                <div className="info-bubble expires">
                    <h3>Expires:</h3>
                    <p>{props.expirationDate}</p>
                </div>
            </div>
            <button className="delete-button">
                Delete
            </button>
        </div>
    );
}

export default FoodCard;