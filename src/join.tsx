import React from 'react'
import { useParams } from '@reach/router'
import { fullUrl } from './utils'
import { useBingoJoin } from './useBingo'
import Loading from './loading'

const Join = () => {
  const { matchId } = useParams()
  const { loading, players } = useBingoJoin(matchId)

  if (loading) return <Loading />

  const sortedPlayers = Object.entries(players)
    .map(([key, value]) => {
      return { key, name: value.name }
    })
    .sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))

  return (
    <div className="setup">
      <p>Haz click en tu nombre para ver tus cartones</p>
      <table>
        <tbody>
          {sortedPlayers.map((p) => {
            const url = fullUrl(`/${matchId}/${p.key}/play`)
            return (
              <tr key={`${p.key}`}>
                <td className={`player`}>
                  <a href={url}>{p.name}</a>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Join
