import type { Pokemon } from '../../api/pokeapi'
import { formatHeight, formatName, formatPokemonId, formatWeight } from '../../lib/format'

type Props = { pokemon: Pokemon }

export function OverviewSection({ pokemon }: Props) {
  const artwork =
    pokemon.sprites.other?.['official-artwork']?.front_default ??
    pokemon.sprites.front_default

  return (
    <section className="detail-section">
      <h2>Overview</h2>
      <div className="overview">
        {artwork && <img className="overview__sprite" src={artwork} />}
        <div>
          <p className="overview__id">{formatPokemonId(pokemon.id)}</p>
          <h3>{formatName(pokemon.name)}</h3>
          <p>Height: {formatHeight(pokemon.height)}</p>
          <p>Weight: {formatWeight(pokemon.weight)}</p>
          <p>Base XP: {pokemon.base_experience}</p>
          <div className="list-row__types">
            {pokemon.types.map((slot) => (
              <span key={slot.slot} className={`type-badge type-badge--${slot.type.name}`}>
                {formatName(slot.type.name)}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
