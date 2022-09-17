import { StatusBar } from 'react-native'

import { 
  useFonts, 
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black
} from '@expo-google-fonts/inter'

import { Background, Loading } from './src/components';

import { Routes } from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({ 
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black
   })

  if(!fontsLoaded) return <Loading />

  return (
    <Background>
        <Routes />

        <StatusBar 
          barStyle='light-content'
          backgroundColor='transparent'
          translucent
        />
    </Background>
  );
}