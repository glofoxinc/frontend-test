import type { PokemonSpecies } from '../../api/pokeapi'
import { formatName } from '../../lib/format'

type Props = { species: PokemonSpecies }

export function SpeciesSection({ species }: Props) {
  const flavor =
    species.flavor_text_entries.find((e) => e.language.name === 'en')?.flavor_text ??
    'No description available.'

  return (
    <section className="detail-section">
      <h2>Species</h2>
      <p className="flavor-text">{flavor.replace(/\f/g, ' ').replace(/\n/g, ' ')}</p>
      <dl className="stats-grid">
        <div>
          <dt>Capture rate</dt>
          <dd>{species.capture_rate}</dd>
        </div>
        <div>
          <dt>Base happiness</dt>
          <dd>{species.base_happiness}</dd>
        </div>
        <div>
          <dt>Color</dt>
          <dd>{formatName(species.color.name)}</dd>
        </div>
        <div>
          <dt>Habitat</dt>
          <dd>{species.habitat ? formatName(species.habitat.name) : 'Unknown'}</dd>
        </div>
        <div>
          <dt>Generation</dt>
          <dd>{formatName(species.generation.name)}</dd>
        </div>
        <div>
          <dt>Hatch counter</dt>
          <dd>{species.hatch_counter}</dd>
        </div>
      </dl>
    </section>
  )
}
