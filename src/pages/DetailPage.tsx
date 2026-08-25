import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  fetchAbility,
  fetchEggGroup,
  fetchEncounters,
  fetchEvolutionChain,
  fetchGrowthRate,
  fetchMove,
  fetchPokemon,
  fetchPokemonForm,
  fetchPokemonSpecies,
  fetchType,
  type AbilityDetail,
  type EggGroup,
  type Encounter,
  type EvolutionChain,
  type GrowthRate,
  type MoveDetail,
  type Pokemon,
  type PokemonForm,
  type PokemonSpecies,
  type TypeDetail,
} from '../api/pokeapi'
import { formatName } from '../lib/format'
import { AbilitiesSection } from './sections/AbilitiesSection'
import { EggGroupsSection } from './sections/EggGroupsSection'
import { EncountersSection } from './sections/EncountersSection'
import { EvolutionSection } from './sections/EvolutionSection'
import { FormsSection } from './sections/FormsSection'
import { GrowthRateSection } from './sections/GrowthRateSection'
import { OverviewSection } from './sections/OverviewSection'
import { SignatureMoveSection } from './sections/SignatureMoveSection'
import { SpeciesSection } from './sections/SpeciesSection'
import { TypeMatchupsSection } from './sections/TypeMatchupsSection'

type DetailData = {
  pokemon: Pokemon
  species: PokemonSpecies
  evolution: EvolutionChain
  types: TypeDetail[]
  abilities: AbilityDetail[]
  move: MoveDetail
  encounters: Encounter[]
  growthRate: GrowthRate
  eggGroups: EggGroup[]
  forms: PokemonForm[]
}

export function DetailPage() {
  const { name: pokemonName = '' } = useParams()
  const [data, setData] = useState<DetailData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(true)
      setData(null)

      const pokemon = await fetchPokemon(pokemonName)
      const species = await fetchPokemonSpecies(pokemon.species.name)
      const evolution = await fetchEvolutionChain(species.evolution_chain.url)

      const types: TypeDetail[] = []
      for (const slot of pokemon.types) {
        types.push(await fetchType(slot.type.name))
      }

      const abilities: AbilityDetail[] = []
      for (const slot of pokemon.abilities) {
        abilities.push(await fetchAbility(slot.ability.name))
      }

      const firstMove = pokemon.moves[0]
      const move = await fetchMove(firstMove.move.name)

      const growthRate = await fetchGrowthRate(species.growth_rate.name)

      const eggGroups: EggGroup[] = []
      for (const group of species.egg_groups) {
        eggGroups.push(await fetchEggGroup(group.name))
      }

      const forms: PokemonForm[] = []
      for (const form of pokemon.forms) {
        forms.push(await fetchPokemonForm(form.name))
      }

      const encounters = await fetchEncounters(pokemon.id)

      setData({
        pokemon,
        species,
        evolution,
        types,
        abilities,
        move,
        encounters,
        growthRate,
        eggGroups,
        forms,
      })
      setLoading(false)
    }

    load()
  }, [pokemonName])

  if (loading || !data) {
    return (
      <div className="page">
        <Link className="back-button" to="/">
          ← Back to list
        </Link>
        <div className="loading">Loading {formatName(pokemonName)}...</div>
      </div>
    )
  }

  return (
    <div className="page page--detail">
      <Link className="back-button" to="/">
        ← Back to list
      </Link>

      <OverviewSection pokemon={data.pokemon} />
      <SpeciesSection species={data.species} />
      <EvolutionSection evolution={data.evolution} />
      <TypeMatchupsSection types={data.types} />
      <AbilitiesSection abilities={data.abilities} />
      <SignatureMoveSection move={data.move} />
      <EncountersSection encounters={data.encounters} />
      <GrowthRateSection growthRate={data.growthRate} />
      <EggGroupsSection eggGroups={data.eggGroups} />
      <FormsSection forms={data.forms} />
    </div>
  )
}
