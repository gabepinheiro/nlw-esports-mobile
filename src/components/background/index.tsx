import { ReactNode } from 'react';

import { ImageBackground } from 'react-native';

import { styles } from './styles';

import bgImage from '../../assets/background-galaxy.png'

type BackgroundProps = {
  children: ReactNode
}

export function Background({ children }: BackgroundProps) {
  return (
    <ImageBackground 
      source={bgImage}
      defaultSource={bgImage}
      style={styles.container}
    >
      {children}
    </ImageBackground>
  );
}