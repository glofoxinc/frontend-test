import type { GrowthRate } from '../../api/pokeapi'
import { formatName } from '../../lib/format'

type Props = { growthRate: GrowthRate }

export function GrowthRateSection({ growthRate }: Props) {
  const description =
    growthRate.descriptions.find((d) => d.language.name === 'en')?.description ??
    formatName(growthRate.name)

  const level50 = growthRate.levels.find((l) => l.level === 50)
  const level100 = growthRate.levels.find((l) => l.level === 100)

  return (
    <section className="detail-section">
      <h2>Growth rate</h2>
      <p>{description}</p>
      <dl className="stats-grid">
        <div>
          <dt>Formula</dt>
          <dd>{formatName(growthRate.name)}</dd>
        </div>
        <div>
          <dt>XP to Lv 50</dt>
          <dd>{level50?.experience.toLocaleString() ?? '—'}</dd>
        </div>
        <div>
          <dt>XP to Lv 100</dt>
          <dd>{level100?.experience.toLocaleString() ?? '—'}</dd>
        </div>
      </dl>
    </section>
  )
}
