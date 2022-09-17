import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Home, Game } from '../screens'

const { Navigator, Screen } = createNativeStackNavigator()

export function AppRoutes () {
  return (
    <Navigator screenOptions={{
      headerShown: false,
      contentStyle: { backgroundColor: 'transparent' }
    }}>
      <Screen name='home' component={Home} />
      <Screen name='game' component={Game} />
    </Navigator>
  )
}