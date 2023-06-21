import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useEffect } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { RootStackParamList } from '../../providers/Navigation'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPokemonById } from '../../slices/pokemon'
import { extractIdFromUrl } from '../../utils/extractIdFromUrl'
import { AppDispatch, RootState } from '../../slices'
import { assetMap } from '../../utils/assetMap'
import { globalStyles } from '../../global/styles'
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter'

type Props = NativeStackScreenProps<RootStackParamList, 'PokemonDetails'>

export const PokemonDetails: React.FC<Props> = ({
  route: {
    params: { url },
  },
}) => {
  const pokemonId = extractIdFromUrl(url)
  const dispatch = useDispatch<AppDispatch>()
  const pokemon = useSelector((state: RootState) => state.pokemon.entities.find(pokemon => pokemon.url === url))
  const pokemonImage = assetMap[pokemonId || 1]
  const pokemonTypes = pokemon?.detail?.types.map(type => type.type.name).join(', ')

  useEffect(() => {
    if (!pokemon?.detail) {
      dispatch(fetchPokemonById(pokemonId!))
    }
  }, [dispatch, pokemonId])
  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={[styles.headerWrapper, styles.container]}>
        <View>
          <Image style={styles.image} source={pokemonImage} />
        </View>
        <View>
          <Text style={[styles.item, globalStyles.header]}>{capitalizeFirstLetter(pokemon?.detail?.name || '')}</Text>
          <Text style={styles.item}>ID: {pokemonId}</Text>
          <Text style={styles.item}>Types: {pokemonTypes}</Text>
        </View>
      </View>
      <View style={[styles.baseStatsWrapper, styles.container]}>
        <View style={styles.item}>
          <Text style={globalStyles.header}>Height: </Text>
          <Text>{pokemon?.detail?.height}</Text>
        </View>
        <View style={styles.item}>
          <Text style={globalStyles.header}>Weight: </Text>
          <Text>{pokemon?.detail?.weight}</Text>
        </View>
        <View style={styles.item}>
          <Text style={globalStyles.header}>Base exp: </Text>
          <Text>{pokemon?.detail?.base_experience}</Text>
        </View>
      </View>
      <View style={[styles.container, styles.statsWrapper]}>
        <Text style={[styles.item, globalStyles.header]}>Stats:</Text>
        <Text style={styles.item}>HP: {pokemon?.detail?.stats.find(stat => stat.stat.name === 'hp')?.base_stat}</Text>
        <Text style={styles.item}>
          ATTACK: {pokemon?.detail?.stats.find(stat => stat.stat.name === 'attack')?.base_stat}
        </Text>
        <Text style={styles.item}>
          DEFENSE: {pokemon?.detail?.stats.find(stat => stat.stat.name === 'defense')?.base_stat}
        </Text>
        <Text style={styles.item}>
          SPEED: {pokemon?.detail?.stats.find(stat => stat.stat.name === 'speed')?.base_stat}
        </Text>
        <Text style={styles.item}>
          SPECIAL-ATTACK: {pokemon?.detail?.stats.find(stat => stat.stat.name === 'special-attack')?.base_stat}
        </Text>
        <Text style={styles.item}>
          SPECIAL-DEFENSE: {pokemon?.detail?.stats.find(stat => stat.stat.name === 'special-defense')?.base_stat}
        </Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginHorizontal: 15,
  },
  container: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    padding: 10,
  },
  image: {
    width: 150,
    height: 150,
  },
  headerWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  baseStatsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    marginVertical: 10,
  },
  statsWrapper: {},
  item: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 5,
  },
})
