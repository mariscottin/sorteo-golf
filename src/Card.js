import React from 'react'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import './Card.css';
function Card(props) {
    return (
        <div className="card">
            <div className="card__delete" onClick={() => props.deleteParticipant(props.name)}>
                <HighlightOffIcon />
            </div>
            <div className="card__name">
                {props.name}
            </div>
        </div>
    )
}

export default Card
