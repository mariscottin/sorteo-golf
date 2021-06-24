import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Logo from './logo.png';
import FormatForm from './FormatForm';
import Card from './Card';
import Results from './Results';
import TeamsResults from './TeamsResults';
import './App.css';

function App() {
  const [participants, setParticipants] = useState([]);
  const [teamPage, setTeamPage] = useState(null);
  const [team1, setTeam1] = useState([]);
  const [team2, setTeam2] = useState([]);
  const [teamsView, setTeamsView] = useState(false);
  const [playersPerTeam, setPlayersPerTeam] = useState(null);
  const [input, setInput] = useState('');
  const [open, setOpen] = useState(false);
  const [sorteo, setSorteo] = useState(false);
  const [format, setFormat] = useState(null);

  const addParticipant = (e) => {
    e.preventDefault();
    if (teamPage === 1) {
      if (!input) {
        return;
      } else if (team1.indexOf(input.toUpperCase()) !== -1) {
        alert(`El nombre "${input}" ya fue ingresado en este bombo.`)
      } else if (team2.indexOf(input.toUpperCase()) !== -1) {
        alert(`El nombre "${input}" ya fue ingresado en el bombo 2.`);
      } else {
        setTeam1([input.toUpperCase(), ...team1]);
        setInput('');
      }
    } else if (teamPage === 2) {
      if (!input) {
        return;
      } else if (team2.indexOf(input.toUpperCase()) !== -1) {
        alert(`El nombre "${input}" ya fue ingresado en este bombo.`);
      } else if (team1.indexOf(input.toUpperCase()) !== -1) {
        alert(`El nombre "${input}" ya fue ingresado en el bombo 1.`);
      } else {
        setTeam2([input.toUpperCase(), ...team2]);
        setInput('');
      }
    } else {
      if (!input) {
        return;
      } else if (participants.indexOf(input.toUpperCase()) !== -1) {
        alert(`El nombre "${input}" ya fue ingresado.`)
      } else {
        setParticipants([input.toUpperCase(), ...participants]);
        setInput('');
      }
    }
  }

  const deleteParticipant = (name) => {
    if (format === "individual") {
      const newArray = participants.filter(participant => participant !== name);
      setParticipants(newArray);
    } else if (teamPage === 1) {
      const newArray = team1.filter(participant => participant !== name);
      setTeam1(newArray);
    } else if (teamPage === 2) {
      const newArray = team2.filter(participant => participant !== name);
      setTeam2(newArray);
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSortear = () => {
    setSorteo(true);
    setOpen(false);
  }

  const handleReset = () => {
    setParticipants([]);
    setSorteo(false);
    setFormat(null);
    setTeamPage(null);
    setTeam1([]);
    setTeam2([]);
    setTeamsView(false);
    setPlayersPerTeam(null);
  }

  const handleFormatSelection = (format) => {
    setFormat(format);
    if (format === "individual") {
      setTeamPage(null);
      setTeam1([]);
      setTeam2([]);
      setPlayersPerTeam(null);
    } else if (format === "equipos") {
      setTeamPage(1);
      setParticipants([]);
    }
  }

  const handleSwitchTeam = () => {
    teamPage === 1 ? setTeamPage(2) : setTeamPage(1);
  }

  const handlePlayersPerTeamSelect = (players) => {
    if (players !== 'default') {
      const number = parseInt(players);
      setPlayersPerTeam(number);
    } else {
      setPlayersPerTeam(null);
    }
  }

  const handleFinishBuildingTeams = () => {
    setTeamsView(true);
  }

  return (
    <div className="app">
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"¿Estás listo para sortear?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Asegurate de haber agregado a todos los participantes. Una vez realizado el sorteo, no se podrá regresar. ¿Estás listo?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSortear} color="primary" autoFocus>
            Sortear
          </Button>
        </DialogActions>
      </Dialog>


      <div className="app__header">
        <div className="app__header-brand">
          <img src={Logo} alt="Captain Willy" />
          <h2>Sorteo Polla CNSI</h2>
        </div>
      </div>
      <div className="app__body">

        {/* Preparando sorteo */}
        {!sorteo &&
          <>
            {!teamsView &&
              <>
                <FormatForm handleFormatSelection={handleFormatSelection} format={format} handlePlayersPerTeamSelect={handlePlayersPerTeamSelect} playersPerTeam={playersPerTeam} />

                <h3 className="app__body-mainTitle">
                  {format === "individual" && "Agregar Participante:"}
                  {(format === "equipos" && teamPage === 1 && playersPerTeam) && "Bombo 1"}
                  {(format === "equipos" && teamPage === 2 && playersPerTeam) && "Bombo 2"}
                </h3>
                {(teamPage && playersPerTeam) &&
                  <h5 className="app__body-teamPage-subtitle">{`Agregar los integrantes del bombo ${teamPage === 1 ? '1' : '2'}:`}</h5>
                }
                {(format === 'individual' || playersPerTeam) &&
                  <form className="app__form">
                    <input
                      type="text"
                      placeholder="Ingresar nombre o apodo"
                      onChange={(e) => setInput(e.target.value)}
                      value={input}
                    />
                    <button className="app__btn app__add" type="submit" onClick={addParticipant}>Agregar</button>
                  </form>
                }
                {(format === "equipos" && teamPage === 2) &&
                  <p onClick={handleSwitchTeam} className="app__footer-back" style={{ textAlign: "center" }}>Volver al bombo 1</p>
                }

                <div className="app__cards-container">
                  {format === "individual" &&
                    participants.map((participant, i) => (
                      <Card key={i} name={participant} deleteParticipant={deleteParticipant} />
                    ))
                  }
                  {(format === "equipos" && teamPage === 1) &&
                    team1.map((participant, i) => (
                      <Card key={i} name={participant} deleteParticipant={deleteParticipant} />
                    ))
                  }
                  {(format === "equipos" && teamPage === 2) &&
                    team2.map((participant, i) => (
                      <Card key={i} name={participant} deleteParticipant={deleteParticipant} />
                    ))
                  }

                </div>

                {participants.length > 0 &&
                  <div className="app__footer">
                    <button onClick={handleClickOpen}>SORTEAR</button>
                  </div>
                }

                {(teamPage === 1 && team1.length > 0) &&
                  <div className="app__footer">
                    <button onClick={handleSwitchTeam}>Ir a Bombo 2</button>
                  </div>
                }

                {(teamPage === 2 && team2.length > 0) &&
                  <div className="app__footer">
                    <button onClick={handleFinishBuildingTeams}>Siguiente</button>
                  </div>
                }
              </>
            }

            {teamsView &&
              <>
                <div className="app__teams">
                  <h1>Bombos</h1>
                  <div className="app__teams-table">
                    <div className="app__teams-table__team">
                      <h3>Equipo 1</h3>
                      {team1.map((player, i) => (
                        <p key={i}>{player}</p>
                      ))}
                    </div>
                    <div className="app__teams-table__line"></div>
                    <div className="app__teams-table__team">
                      <h3>Equipo 2</h3>
                      {team2.map((player, i) => (
                        <p key={i}>{player}</p>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="app__footer">
                  <p className="app__footer-back teamsView-back" onClick={() => setTeamsView(false)}>Volver a armado de bombos</p>
                  {playersPerTeam > 1 &&
                    <button onClick={handleClickOpen}>SORTEAR</button>
                  }
                  {playersPerTeam === 1 &&
                    <button onClick={handleClickOpen}>SORTEAR</button>
                  }
                </div>
              </>
            }
          </>

        }

        {/* Resultados del sorteo */}
        {(format === "individual" && sorteo) &&
          <Results participants={participants} handleReset={handleReset} />
        }
        {(format === "equipos" && sorteo) &&
          <TeamsResults team1={team1} team2={team2} playersPerTeam={playersPerTeam} handleReset={handleReset} />
        }
      </div>
    </div>
  );
}

export default App;
