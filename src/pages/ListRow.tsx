import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchPokemon, type Pokemon } from '../api/pokeapi'
import { formatName, formatPokemonId } from '../lib/format'

type ListRowProps = {
  name: string
}

export function ListRow({ name }: ListRowProps) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null)

  useEffect(() => {
    fetchPokemon(name).then(setPokemon)
  }, [name])

  return (
    <Link className="list-row" to={`/pokemon/${name}`}>
      <div className="list-row__sprite">
        {pokemon?.sprites.front_default ? (
          <img src={pokemon.sprites.front_default} />
        ) : (
          <div className="list-row__sprite-placeholder" />
        )}
      </div>
      <div className="list-row__info">
        <span className="list-row__id">
          {pokemon ? formatPokemonId(pokemon.id) : '...'}
        </span>
        <span className="list-row__name">{formatName(name)}</span>
      </div>
      <div className="list-row__types">
        {pokemon?.types.map((slot) => (
          <span key={slot.slot} className={`type-badge type-badge--${slot.type.name}`}>
            {formatName(slot.type.name)}
          </span>
        ))}
      </div>
    </Link>
  )
}
