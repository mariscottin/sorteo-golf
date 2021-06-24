import React from 'react';
import { Avatar } from '@material-ui/core';

import './Line.css';
function Line({ line, number }) {
    return (
        <div className="line">
            <h2>Linea {number + 1}</h2>
            <div className="line__players">
                {
                    line.map((name, i) => (
                        <div className="line__playersAvatar" key={i}>
                            <Avatar src={`https://avatars.dicebear.com/api/male/${Math.floor(Math.random() * 5000)}.svg`} />
                            <span>
                                {name}
                            </span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Line
