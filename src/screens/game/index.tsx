import { useState, useEffect } from 'react';

import { View, TouchableOpacity, Image, FlatList, Text } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native'

import { SafeAreaView } from "react-native-safe-area-context";

import { DuoCard, DuoCardProps, Heading, DuoMatch } from '../../components';

import { Entypo } from '@expo/vector-icons'

import { GameParams } from '../../@types/navigation'

import logoImg from '../../assets/logo-nlw-esports.png'

import { THEME } from '../../theme';

import { styles } from './styles'

export function Game (){
  const [duos, setDuos] = useState<DuoCardProps[] | null>(null)

  const route = useRoute()

  const game = route.params as GameParams

  const { goBack } = useNavigation()

  const [discordDuoSelected, setDiscordDuoSelected] = useState('')

  useEffect(() => {
    fetch(`http://192.168.15.12:3333/games/${game.id}/ads`)
      .then(r => r.json())
      .then(setDuos)
  }, [])

  function handleClose () {
    setDiscordDuoSelected('')
  }

  function handleGoBack () {
    goBack()
  }

  async function getDiscordUser (adsId: string) {
    const res = await fetch(`http://192.168.15.12:3333/ads/${adsId}/discord`)
    const data = await res.json()

    setDiscordDuoSelected(data.discord)
  }

  if (!duos) return null

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity>
            <Entypo 
              name='chevron-thin-left'
              color={THEME.COLORS.CAPTION_300}
              size={20}
              onPress={handleGoBack}
            />
          </TouchableOpacity>

          <Image
            source={logoImg}
            style={styles.logo}
          />

          <View style={styles.right} />
        </View>

        <Image 
          source={{ uri: game.bannerUrl }}
          style={styles.bannerUrl}
          resizeMode='cover'
        />

        <Heading 
          title={game.title}
          subTitle='Conecte-se e comece a jogar!'
        />

        <FlatList 
          data={duos}
          keyExtractor={({ id }) => id}
          renderItem={({ item }) => <DuoCard data={item} onConnect={() => getDiscordUser(item.id)} />}
          horizontal
          style={styles.containerList}
          contentContainerStyle={duos.length > 0 ? styles.contentList  : styles.emptyListContent}
          showsHorizontalScrollIndicator
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Não Há anúncios publicados ainda.
            </Text>
          )}
        />

        <DuoMatch
          visible={!!discordDuoSelected}
          discord={discordDuoSelected}
          onClose={handleClose}
        />
    </SafeAreaView>
  )
}