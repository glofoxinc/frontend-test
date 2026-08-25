import type { PokemonForm } from '../../api/pokeapi'
import { formatName } from '../../lib/format'

type Props = { forms: PokemonForm[] }

export function FormsSection({ forms }: Props) {
  return (
    <section className="detail-section">
      <h2>Forms</h2>
      <div className="forms-grid">
        {forms.map((form) => (
          <div key={form.id} className="form-card">
            {form.sprites.front_default && (
              <img src={form.sprites.front_default} />
            )}
            <p>{formatName(form.name)}</p>
            <p className="muted">
              {form.is_default && 'Default'}
              {form.is_mega && ' Mega'}
              {form.is_battle_only && ' Battle-only'}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
