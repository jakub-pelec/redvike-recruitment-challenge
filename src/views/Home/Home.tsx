import React, { useEffect, useMemo, useState } from 'react'
import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { LOADING_STATE, fetchPokemons } from '../../slices/pokemon'
import { AppDispatch, RootState } from '../../slices'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../providers/Navigation'
import { PokemonListItem } from '../../components/PokemonListItem/PokemonListItem'

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>

export const Home: React.FC<Props> = ({ navigation }) => {
  const [nameFilter, setNameFilter] = useState<string | undefined>(undefined)
  const dispatch = useDispatch<AppDispatch>()
  const pokemons = useSelector((state: RootState) => state.pokemon.entities)
  const loading = useSelector((state: RootState) => state.pokemon.loading)

  useEffect(() => {
    dispatch(fetchPokemons())
  }, [dispatch, fetchPokemons])

  const filteredResults = useMemo(
    () => pokemons.filter(pokemon => (nameFilter ? pokemon.name.includes(nameFilter.toLowerCase()) : true)),
    [nameFilter, pokemons],
  )

  return (
    <SafeAreaView style={styles.wrapper}>
      <TextInput
        style={styles.textInput}
        onChangeText={text => setNameFilter(text)}
        value={nameFilter}
        placeholder="Search by name..."
      />
      {loading === LOADING_STATE.IDLE && (
        <FlatList
          data={filteredResults}
          renderItem={({ item }) => <PokemonListItem navigate={navigation.navigate} name={item.name} url={item.url} currentSearch={nameFilter} />}
          keyExtractor={item => item.name}
        />
      )}
      {loading === LOADING_STATE.LOADING && <Text>Loading</Text>}
      {loading === LOADING_STATE.FAILED && <Text>Failed to fetch data. Please try again.</Text>}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 30,
  },
  textInput: {
    height: 30,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    padding: 3,
    marginVertical: 30,
    borderRadius: 5
  },
})
