import type { AbilityDetail } from '../../api/pokeapi'
import { formatName } from '../../lib/format'

type Props = { abilities: AbilityDetail[] }

export function AbilitiesSection({ abilities }: Props) {
  return (
    <section className="detail-section">
      <h2>Abilities</h2>
      <ul className="ability-list">
        {abilities.map((ability) => {
          const effect =
            ability.effect_entries.find((e) => e.language.name === 'en')?.short_effect ??
            'No effect description.'
          return (
            <li key={ability.id}>
              <strong>{formatName(ability.name)}</strong>
              <p>{effect}</p>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
