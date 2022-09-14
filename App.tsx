import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type ButtonProps = {
  text: string  
}

const Button = ({ text }: ButtonProps) => {
  return (
    <View>
      <TouchableOpacity>
        <Text style={styles.button}>{text}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>NLW eSports</Text>
      <Button text='MyButton'/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#fff'
  },
  button: {
    backgroundColor: 'purple',
    padding: 8,
    marginTop: 16,
    borderRadius: 8,
    color: '#fff'
  }
});
