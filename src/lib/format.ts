export function formatName(name: string): string {
  return name
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

/** Height from PokeAPI is in decimetres. */
export function formatHeight(decimetres: number): string {
  const metres = decimetres / 10
  return `${metres.toFixed(1)} m`
}

/** Weight from PokeAPI is in hectograms. */
export function formatWeight(hectograms: number): string {
  const kilograms = hectograms / 10
  return `${kilograms.toFixed(1)} kg`
}

export function formatPokemonId(id: number): string {
  return `#${String(id).padStart(3, '0')}`
}
