//rendering the items using list is not a good approach as it print all the id , so will be a big problem for largetDataset
//FlatList (it render the items currently in the view)
//also it generates few advance components as ensure smooth operation
import { StyleSheet, Text, View, ScrollView , StatusBar, SafeAreaView ,FlatList} from 'react-native';
import pokemonList from './data.json'

export default function App() {
  return (
    // <ScrollView style={styles.scrollView}>
    //   <View style={styles.container}>
    //   {
    //     pokemonList.map((pokemon)=>{
    //       return(
            
    //         <View id='{pokemon.id}' style = {styles.card}>
    //           <Text>{pokemon.type}</Text>
    //           <Text>{pokemon.name}</Text>
    //         </View>
    //       )
    //     })
    //   }
    //   <StatusBar style="auto" />
    // </View>
    // </ScrollView>
    <SafeAreaView>
      <FlatList 
      data = {pokemonList}
      renderItem = {({item})=>{
        console.log(item.id);
        return(
          <View id='{item.id}' style = {styles.card}>
              
               <Text>{item.type}</Text>
               <Text>{item.name}</Text>
          </View>
        )
      }}
      ItemSeparatorComponent = {
        () => {
          return(
            <View style = {styles.separator}></View>
          )
        }
      } 
      ListEmptyComponent={<Text>No data found</Text>}
      ListHeaderComponent={<Text style = {styles.listHeader}>List of Pokemon</Text>}
      ListFooterComponent={<Text>PokemonList</Text>}
    />
    </SafeAreaView>
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
    //marginBottom:16,
    borderWidth:1,
    padding:16,
  },
  separator : {
    height:16,
    backgroundColor:'#e0e0e0',

  },
  listHeader : {
    margin:10,
    textAlign:'center',
    fontSize:24,
  },
});
