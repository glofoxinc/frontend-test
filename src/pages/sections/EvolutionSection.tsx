import type { EvolutionChain, EvolutionNode } from '../../api/pokeapi'
import { formatName } from '../../lib/format'

type Props = { evolution: EvolutionChain }

function collectChain(node: EvolutionNode, acc: string[] = []): string[] {
  acc.push(node.species.name)
  for (const child of node.evolves_to) {
    collectChain(child, acc)
  }
  return acc
}

export function EvolutionSection({ evolution }: Props) {
  const names = collectChain(evolution.chain)

  return (
    <section className="detail-section">
      <h2>Evolution chain</h2>
      <ol className="evolution-chain">
        {names.map((name) => (
          <li key={name}>{formatName(name)}</li>
        ))}
      </ol>
    </section>
  )
}
