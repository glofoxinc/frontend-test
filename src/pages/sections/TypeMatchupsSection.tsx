import type { TypeDetail } from '../../api/pokeapi'
import { formatName } from '../../lib/format'

type Props = { types: TypeDetail[] }

export function TypeMatchupsSection({ types }: Props) {
  return (
    <section className="detail-section">
      <h2>Type matchups</h2>
      {types.map((type) => (
        <div key={type.id} className="type-matchup">
          <h3 className={`type-badge type-badge--${type.name}`}>{formatName(type.name)}</h3>
          <p>
            <strong>Weak to:</strong>{' '}
            {type.damage_relations.double_damage_from.map((t) => formatName(t.name)).join(', ') ||
              'None'}
          </p>
          <p>
            <strong>Strong against:</strong>{' '}
            {type.damage_relations.double_damage_to.map((t) => formatName(t.name)).join(', ') ||
              'None'}
          </p>
          <p>
            <strong>Immune to:</strong>{' '}
            {type.damage_relations.no_damage_from.map((t) => formatName(t.name)).join(', ') ||
              'None'}
          </p>
        </div>
      ))}
    </section>
  )
}
