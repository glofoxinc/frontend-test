import type { Encounter } from '../../api/pokeapi'
import { formatName } from '../../lib/format'

type Props = { encounters: Encounter[] }

export function EncountersSection({ encounters }: Props) {
  return (
    <section className="detail-section">
      <h2>Encounters</h2>
      {encounters.length === 0 ? (
        <p>No wild encounter data available.</p>
      ) : (
        <ul className="encounter-list">
          {encounters.slice(0, 12).map((enc) => (
            <li key={enc.location_area.name}>
              {formatName(enc.location_area.name)}
              <span className="muted">
                {' '}
                (
                {enc.version_details.map((v) => formatName(v.version.name)).join(', ')})
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
