import React from 'react'
import { useParams } from '@reach/router'
import Ranking from './ranking'
import Balls from './balls'
import Canvas from './canvas'
import { useBingo } from './useBingo'

const Lead = ({ navigate }) => {
  const { matchId } = useParams()
  const { restartMatch, match } = useBingo(matchId)

  const onRestartClick = () => {
    restartMatch()
  }

  const onEndClick = () => {
    restartMatch()
    navigate(`/${matchId}/edit`)
  }

  if (match === undefined) return <h4>Invalid match...</h4>

  return (
    <div className="game">
      <div className="main">
        <Canvas />
        <Balls reversed={false} balls={match.balls} />
      </div>
      <div className="aside">
        <Ranking players={match.players} balls={match.balls} />
        <button onClick={() => navigate(`/${matchId}/edit`)}>
          EDITAR PARTIDA
        </button>
        <button onClick={onRestartClick}>RECOMENZAR</button>
        <button onClick={onEndClick}>FINALIZAR</button>
      </div>
    </div>
  )
}

export default Lead
