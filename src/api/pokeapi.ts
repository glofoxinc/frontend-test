import { apiGet } from './client'

export type NamedResource = {
  name: string
  url: string
}

export type PaginatedList = {
  count: number
  next: string | null
  previous: string | null
  results: NamedResource[]
}

export type PokemonSprites = {
  front_default: string | null
  other?: {
    'official-artwork'?: {
      front_default: string | null
    }
  }
}

export type PokemonTypeSlot = {
  slot: number
  type: NamedResource
}

export type PokemonAbilitySlot = {
  ability: NamedResource
  is_hidden: boolean
  slot: number
}

export type PokemonMoveSlot = {
  move: NamedResource
}

export type Pokemon = {
  id: number
  name: string
  height: number
  weight: number
  base_experience: number
  sprites: PokemonSprites
  types: PokemonTypeSlot[]
  abilities: PokemonAbilitySlot[]
  moves: PokemonMoveSlot[]
  forms: NamedResource[]
  species: NamedResource
}

export type PokemonSpecies = {
  id: number
  name: string
  base_happiness: number
  capture_rate: number
  gender_rate: number
  hatch_counter: number
  color: NamedResource
  shape: NamedResource | null
  habitat: NamedResource | null
  generation: NamedResource
  growth_rate: NamedResource
  egg_groups: NamedResource[]
  evolution_chain: { url: string }
  flavor_text_entries: Array<{
    flavor_text: string
    language: NamedResource
    version: NamedResource
  }>
}

export type EvolutionChain = {
  id: number
  chain: EvolutionNode
}

export type EvolutionNode = {
  species: NamedResource
  evolves_to: EvolutionNode[]
}

export type TypeDetail = {
  id: number
  name: string
  damage_relations: {
    double_damage_from: NamedResource[]
    double_damage_to: NamedResource[]
    half_damage_from: NamedResource[]
    half_damage_to: NamedResource[]
    no_damage_from: NamedResource[]
    no_damage_to: NamedResource[]
  }
}

export type AbilityDetail = {
  id: number
  name: string
  effect_entries: Array<{
    effect: string
    short_effect: string
    language: NamedResource
  }>
}

export type MoveDetail = {
  id: number
  name: string
  accuracy: number | null
  power: number | null
  pp: number | null
  priority: number
  type: NamedResource
  damage_class: NamedResource
  effect_entries: Array<{
    effect: string
    short_effect: string
    language: NamedResource
  }>
}

export type GrowthRate = {
  id: number
  name: string
  descriptions: Array<{
    description: string
    language: NamedResource
  }>
  levels: Array<{ level: number; experience: number }>
}

export type EggGroup = {
  id: number
  name: string
  pokemon_species: NamedResource[]
}

export type PokemonForm = {
  id: number
  name: string
  form_name: string
  is_default: boolean
  is_battle_only: boolean
  is_mega: boolean
  sprites: PokemonSprites
}

export type Encounter = {
  location_area: NamedResource
  version_details: Array<{
    max_chance: number
    version: NamedResource
  }>
}

export function fetchPokemonList(limit: number, offset: number) {
  return apiGet<PaginatedList>(`/pokemon?limit=${limit}&offset=${offset}`)
}

export function fetchPokemon(nameOrId: string | number) {
  return apiGet<Pokemon>(`/pokemon/${nameOrId}`)
}

export function fetchPokemonSpecies(nameOrId: string | number) {
  return apiGet<PokemonSpecies>(`/pokemon-species/${nameOrId}`)
}

export function fetchEvolutionChain(url: string) {
  return apiGet<EvolutionChain>(url)
}

export function fetchType(nameOrId: string | number) {
  return apiGet<TypeDetail>(`/type/${nameOrId}`)
}

export function fetchAbility(nameOrId: string | number) {
  return apiGet<AbilityDetail>(`/ability/${nameOrId}`)
}

export function fetchMove(nameOrId: string | number) {
  return apiGet<MoveDetail>(`/move/${nameOrId}`)
}

export function fetchGrowthRate(nameOrId: string | number) {
  return apiGet<GrowthRate>(`/growth-rate/${nameOrId}`)
}

export function fetchEggGroup(nameOrId: string | number) {
  return apiGet<EggGroup>(`/egg-group/${nameOrId}`)
}

export function fetchPokemonForm(nameOrId: string | number) {
  return apiGet<PokemonForm>(`/pokemon-form/${nameOrId}`)
}

export function fetchEncounters(nameOrId: string | number) {
  return apiGet<Encounter[]>(`/pokemon/${nameOrId}/encounters`)
}
