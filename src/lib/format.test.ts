import { formatHeight, formatName, formatPokemonId, formatWeight } from './format'

describe('format', () => {
  it('formatName capitalizes names', () => {
    expect(formatName('pikachu')).toBe('Pikachu')
    expect(formatName('mr-mime')).toBe('Mr Mime')
  })

  it('formatHeight and formatWeight convert API units', () => {
    expect(formatHeight(4)).toBe('0.4 m')
    expect(formatWeight(60)).toBe('6.0 kg')
  })

  it('formatPokemonId zero-pads the id', () => {
    expect(formatPokemonId(25)).toBe('#025')
  })
})
