import React from 'react'
import { useBingo } from './useBingo'
import { useNavigate } from '@reach/router'

const Home = () => {
  const navigate = useNavigate()
  const { createMatch, match, isOwner } = useBingo()

  const onCreateClick = () => {
    const match = createMatch()
    navigate(`/${match.id}/edit`)
  }

  return (
    <div className="setup">
      {match && isOwner && (
        <div>
          <button onClick={() => navigate(`/${match.id}/edit`)}>
            Editar partida anterior
          </button>
          <button onClick={() => navigate(`/${match.id}/play`)}>
            Reanudar partida anterior
          </button>
        </div>
      )}
      <div>
        <button onClick={onCreateClick}>Crear una partida nueva</button>
        <button onClick={() => navigate('/faq')}>
          Necesito más información
        </button>
      </div>
    </div>
  )
}

export default Home
