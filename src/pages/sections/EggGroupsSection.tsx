import type { EggGroup } from '../../api/pokeapi'
import { formatName } from '../../lib/format'

type Props = { eggGroups: EggGroup[] }

export function EggGroupsSection({ eggGroups }: Props) {
  return (
    <section className="detail-section">
      <h2>Egg groups</h2>
      {eggGroups.map((group) => (
        <div key={group.id} className="egg-group">
          <h3>{formatName(group.name)}</h3>
          <p className="muted">
            {group.pokemon_species.length} species in this group
            {group.pokemon_species.length > 0 && (
              <>
                {' '}
                (e.g.{' '}
                {group.pokemon_species
                  .slice(0, 5)
                  .map((s) => formatName(s.name))
                  .join(', ')}
                )
              </>
            )}
          </p>
        </div>
      ))}
    </section>
  )
}
