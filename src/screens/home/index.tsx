import { useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';

import { GameParams } from '../../@types/navigation';

import { Image, FlatList } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context'

import { Heading, GameCard } from '../../components'

import logoImg from '../../assets/logo-nlw-esports.png'

import { styles } from './styles';

type GameApiResponse = {
  id: string
  title: string
  _count: {
    ads: number
  }
  bannerUrl: string
}

export function Home() {
  const [games, setGames] = useState<GameApiResponse[]>([])

  const navigation = useNavigation()

  useEffect(() => {
    fetch('http://192.168.15.12:3333/games')
      .then(r => r.json())
      .then(setGames)
  }, [])

  function handleOpenGame (game: GameParams) {
    navigation.navigate('game', game)
  }

  return (
      <SafeAreaView style={styles.container}>
        <Image 
          source={logoImg}
          style={styles.logo}
        />

        <Heading 
          title='Encontre seu duo!' 
          subTitle='Selecione o game que deseja jogar.'
        />

        <FlatList 
          data={games}
          keyExtractor={({ id }) => id}
          renderItem={({ item: { id, title, _count: { ads }, bannerUrl} }) => (
            <GameCard 
              id={id}
              name={title}
              ads={ads}
              cover={{ uri: bannerUrl }}
              onPress={() => handleOpenGame({ id, title, bannerUrl })}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator
          contentContainerStyle={styles.contentList}
        />
      </SafeAreaView>
  );
}