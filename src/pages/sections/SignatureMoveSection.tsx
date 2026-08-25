import type { MoveDetail } from '../../api/pokeapi'
import { formatName } from '../../lib/format'

type Props = { move: MoveDetail }

export function SignatureMoveSection({ move }: Props) {
  const effect =
    move.effect_entries.find((e) => e.language.name === 'en')?.short_effect ??
    'No effect description.'

  return (
    <section className="detail-section">
      <h2>Signature move</h2>
      <h3>{formatName(move.name)}</h3>
      <dl className="stats-grid">
        <div>
          <dt>Type</dt>
          <dd>{formatName(move.type.name)}</dd>
        </div>
        <div>
          <dt>Power</dt>
          <dd>{move.power ?? '—'}</dd>
        </div>
        <div>
          <dt>Accuracy</dt>
          <dd>{move.accuracy ?? '—'}</dd>
        </div>
        <div>
          <dt>PP</dt>
          <dd>{move.pp ?? '—'}</dd>
        </div>
        <div>
          <dt>Class</dt>
          <dd>{formatName(move.damage_class.name)}</dd>
        </div>
      </dl>
      <p>{effect}</p>
    </section>
  )
}
