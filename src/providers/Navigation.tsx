import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { Home } from '../views/Home/Home'
import { PokemonDetails } from '../views/PokemonDetails/PokemonDetails'

export type RootStackParamList = {
  Home: undefined
  PokemonDetails: { url: string }
}

const Stack = createNativeStackNavigator<RootStackParamList>()

interface IProps {}
export const NavigationProvider: React.FC<IProps> = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{ headerTitle: 'Pokedex' }} />
        <Stack.Screen
          name="PokemonDetails"
          component={PokemonDetails}
          options={{ headerTitle: '', headerBackVisible: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
