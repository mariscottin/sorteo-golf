import React, { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import Line from './Line';
import './Results.css';
function Results({ participants, handleReset }) {
    const [shuffledParticipants, setShuffledParticipants] = useState();
    const [isLoading, setIsLoading] = useState(false)

    const handleFinish = () => {
        setShuffledParticipants();
        handleReset();
    }

    useEffect(() => {
        function shuffle(array) {
            setIsLoading(true);
            setTimeout(() => {
                let currentIndex = array.length;
                let temporaryValue;
                let randomIndex;

                // While there remain elements to shuffle...
                while (0 !== currentIndex) {

                    // Pick a remaining element...
                    randomIndex = Math.floor(Math.random() * currentIndex);
                    currentIndex -= 1;

                    // And swap it with the current element.
                    temporaryValue = array[currentIndex];
                    array[currentIndex] = array[randomIndex];
                    array[randomIndex] = temporaryValue;
                }

                //Reduce array to chunks of 4 (para separar por linea)
                const chunk = (arr, size) => (
                    arr.reduce((acc, e, i) => (
                        i % size ? acc[acc.length - 1].push(e) : acc.push([e]), acc), []
                    )
                );

                const finalArray = chunk(array, 4); //4 para separar lineas de 4 jugadores

                setShuffledParticipants(finalArray);

                setIsLoading(false);
            }, 3000)
        }
        shuffle(participants);
    }, [participants]);


    return (
        <div className="results">
            <h1>{isLoading ? 'Cargando...' : 'Resultados'}</h1>
            <div className="results__lines">
                {isLoading &&
                    <div className="results__loadingContainer">
                        <ReactLoading type={'balls'} color={'#5079c5'} height={150} width={92} />
                    </div>
                }
                {(shuffledParticipants && !isLoading) &&
                    shuffledParticipants.map((line, i) => (
                        <Line line={line} key={i} number={i} />
                    ))
                }
            </div>
            {!isLoading &&
                <div className="results__footer">
                    <button onClick={handleFinish}>Finalizar</button>
                </div>

            }
        </div>
    )
}

export default Results
