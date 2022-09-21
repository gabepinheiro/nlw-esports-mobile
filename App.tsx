import { useRef, useEffect } from 'react'

import { StatusBar } from 'react-native'

import * as Notifications from 'expo-notifications';

import { Subscription } from 'expo-modules-core'

import { 
  useFonts, 
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black
} from '@expo-google-fonts/inter'

import { Background, Loading } from './src/components';

import { Routes } from './src/routes';

import './src/services'
import { getPushNotificationToken } from './src/services/getPushNotificationToken'

export default function App() {
  const getNotificationListener = useRef<Subscription>()
  const responseNotificationListener = useRef<Subscription>()

  const [fontsLoaded] = useFonts({ 
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black
   })

   useEffect(() => {
    getPushNotificationToken()
   })

   useEffect(() => {
    getNotificationListener.current = Notifications
      .addNotificationReceivedListener((notification) => {
        console.log(notification)
      })
    
    responseNotificationListener.current = Notifications
      .addNotificationResponseReceivedListener(response => {
        console.log(response)
      })

      return () => {
        if (getNotificationListener.current && responseNotificationListener.current) {
          Notifications.removeNotificationSubscription(getNotificationListener.current)
          Notifications.removeNotificationSubscription(responseNotificationListener.current)
        }
      }
   }, [])

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

