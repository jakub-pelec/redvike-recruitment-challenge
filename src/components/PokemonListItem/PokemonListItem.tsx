import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { extractIdFromUrl } from '../../utils/extractIdFromUrl'
import { assetMap } from '../../utils/assetMap'
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter'
import { splitWithSeparator } from '../../utils/splitWithSeparator'

interface IProps {
  url: string
  name: string
  navigate: any
  currentSearch: string | undefined
}

export const PokemonListItem: React.FC<IProps> = ({ name, url, navigate, currentSearch }) => {
  const pokemonId = extractIdFromUrl(url)
  const pokemonImage = assetMap[pokemonId || 1]
  const capitalizedPokemonName = capitalizeFirstLetter(name)
  const coloredName = currentSearch
    ? splitWithSeparator(capitalizedPokemonName, currentSearch)
    : [capitalizedPokemonName]
  return (
    <Pressable onPress={() => navigate('PokemonDetails', { url })}>
      <View style={styles.wrapper}>
        <Image style={styles.image} source={pokemonImage} />
        <View style={styles.coloredTextWrapper}>
          {coloredName.map(chunk => (
            <Text style={chunk === currentSearch && styles.coloredText}>{chunk}</Text>
          ))}
        </View>
        <Text>{'>>>'}</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'white',
  },
  coloredText: { backgroundColor: '#b57fc7', display: 'flex', textTransform: 'uppercase' },
  image: { width: 50, height: 50 },
  coloredTextWrapper: { display: 'flex', flexDirection: 'row' },
})
