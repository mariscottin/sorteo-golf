import React, { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';

import Line from './Line';
import './TeamsResults.css';

function TeamsResults(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [shuffledTeam1, setShuffledTeam1] = useState(null);
    const [shuffledTeam2, setShuffledTeam2] = useState(null);

    useEffect(() => {

        const shuffleCouples = (array, team) => {
            setIsLoading(true);
            setTimeout(() => {
                let currentIndex = array.length, temporaryValue, randomIndex;
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

                //Reduce array to chunks of 2 or 4 (para armar los equipos, depende de lo que se selecciono)

                const chunk = (arr, size) => (
                    arr.reduce((acc, e, i) => (
                        i % size ? acc[acc.length - 1].push(e) : acc.push([e]), acc), []
                    )
                );

                const finalArray = chunk(array, props.playersPerTeam > 1 ? props.playersPerTeam : 2); //armar equipos de a 2 o 4, dependiendo de lo que se selecciono

                if (team === 1) {
                    setShuffledTeam1(finalArray);
                    setIsLoading(false);
                    return;
                }

                if (team === 2) {
                    setShuffledTeam2(finalArray);
                    setIsLoading(false);
                    return;
                }

            }, 3000);
        }

        shuffleCouples(props.team1, 1);
        shuffleCouples(props.team2, 2);

    }, [props.team1, props.team2, props.playersPerTeam]);


    const handleFinish = () => {
        setShuffledTeam1(null);
        setShuffledTeam2(null);
        props.handleReset();
    }


    return (
        <div className="teamsResults">
            <h1>{isLoading ? 'Cargando...' : 'Resultados'}</h1>
            {isLoading &&
                <div className="results__loadingContainer">
                    <ReactLoading type={'balls'} color={'#5079c5'} height={150} width={92} />
                </div>
            }
            {(shuffledTeam1 && shuffledTeam2 && !isLoading) &&
                <div className="teamsResults__linesContainer">

                    {(props.playersPerTeam === 1) && shuffledTeam1.map((player, i) => (
                        <Line line={[player[0], shuffledTeam2[i][0], player[1], shuffledTeam2[i][1]]} number={i} key={i} />
                    ))}

                    {(props.playersPerTeam === 2) && shuffledTeam1.map((couple, i) => (
                        <div className="teamsResults__line" key={i}>
                            <h3>{`Linea ${i + 1}`}</h3>
                            {(props.playersPerTeam === 2) &&
                                <div className="teamResults__line-players">
                                    <div className="teamResults__line-team">
                                        {`${couple[0]} y ${couple[1]}`}
                                    </div>
                                    <div className="teamResults__line-vs">V.S.</div>
                                    <div className="teamResults__line-team">
                                        {`${shuffledTeam2[i][0]} y ${shuffledTeam2[i][1]}`}
                                    </div>
                                </div>
                            }
                        </div>
                    ))}

                    {(props.playersPerTeam === 4 && shuffledTeam1 && shuffledTeam2) &&
                        shuffledTeam1.concat(shuffledTeam2).map((line, i) => (
                            <Line line={line} key={i} number={i} />
                        ))
                    }
                </div>
            }

            {!isLoading &&
                <div className="results__footer">
                    <button onClick={handleFinish}>Finalizar</button>
                </div>
            }

        </div >
    )
}

export default TeamsResults;
