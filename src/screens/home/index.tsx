import { View, Image, FlatList } from 'react-native';

import logoImg from '../../assets/logo-nlw-esports.png'

import { Heading, GameCard } from '../../components'

import { styles } from './styles';

import { GAMES } from '../../utils/games'

export function Home() {
  return (
    <View style={styles.container}>
      <Image 
        source={logoImg}
        style={styles.logo}
      />

      <Heading 
        title='Encontre seu duo!' 
        subTitle='Selecione o game que deseja jogar.'
      />

      <FlatList 
        data={GAMES}
        keyExtractor={({ id }) => id}
        renderItem={({ item: game }) => (
          <GameCard {...game} />
        )}
        horizontal
        showsHorizontalScrollIndicator
        contentContainerStyle={styles.contentList}
      />
    </View>
  );
}