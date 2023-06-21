import * as React from 'react'
import { Provider } from 'react-redux'
import store from './src/slices'
import { NavigationProvider } from './src/providers/Navigation'

function App() {
  return (
    <Provider store={store}>
      <NavigationProvider />
    </Provider>
  )
}

export default App
