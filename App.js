//we learn how to render  a list of items in rn using map function and scrollView

import { StyleSheet, Text, View, ScrollView , StatusBar } from 'react-native';
import pokemonList from './data.json'

export default function App() {
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
      {
        pokemonList.map((pokemon)=>{
          return(
            
            <View id='{pokemon.id}' style = {styles.card}>
              <Text>{pokemon.type}</Text>
              <Text>{pokemon.name}</Text>
            </View>
          )
        })
      }
      <StatusBar style="auto" />
    </View>
    </ScrollView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    paddingHorizontal : "16",
  },
  card : {
    borderRadius:8,
    marginBottom:16,
    borderWidth:1,
    padding:16,

  }
});
