import React, { useState } from 'react'

import './FormatForm.css';
function FormatForm(props) {
    const [individualChecked, setIndividualChecked] = useState(false);
    const [equiposChecked, setEquiposChecked] = useState(false);

    const handleOptionChange = (e) => {
        props.handleFormatSelection(e.target.value);
        if (e.target.value === 'individual') {
            if (e.target.checked) {
                setIndividualChecked(true);
                setEquiposChecked(false);
            } else {
                setIndividualChecked(false);
            }
        } else if (e.target.value === 'equipos') {
            if (e.target.checked) {
                setEquiposChecked(true);
                setIndividualChecked(false);
            } else {
                setEquiposChecked(false);
            }
        }
    }
    const handleSelectChange = (e) => {
        props.handlePlayersPerTeamSelect(e.target.value);
    }
    return (
        <>
            <div className="format">
                <h4>Seleccionar formato:</h4>
                <form>
                    <div className={`format__form-option ${individualChecked && 'format__form-optionSelected'}`}>
                        <input type="radio" value="individual" name="format" id="individual" onChange={handleOptionChange} checked={props.format === 'individual'} />
                        <label htmlFor="individual">Individual</label>
                    </div>
                    <div className={`format__form-option ${equiposChecked && 'format__form-optionSelected'}`}>
                        <input type="radio" value="equipos" name="format" id="equipos" onChange={handleOptionChange} checked={props.format === 'equipos'} />
                        <label htmlFor="equipos">En Equipos (bombos)</label>
                    </div>
                </form>
            </div>
            {props.format === 'equipos' &&
                <div className="format__players">
                    <label htmlFor="players">Modalidad de juego:</label>
                    <select id="players" onChange={handleSelectChange}>
                        <option value='default'></option>
                        <option value={1} selected={props.playersPerTeam === 1}>Medal</option>
                        <option value={2} selected={props.playersPerTeam === 2}>Fourball</option>
                        <option value={4} selected={props.playersPerTeam === 4}>Laguneada</option>
                    </select>
                </div>
            }

        </>

    )
}

export default FormatForm;
