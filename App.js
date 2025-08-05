import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Button, TextInput, TextInputComponent } from 'react-native';
import { SafeAreaView, StyleSheet, Text, View, FlatList } from 'react-native';

// Error 1: FlatList should be imported from 'react-native', not 'react-native-web'.
// Error 2: useEffect is incorrectly placed inside fetchData. It should be at the top level of the component.
// Error 3: keyExtractor syntax is wrong. It should be keyExtractor={item => item.id.toString()}
// Error 4: <view> should be <View> (React Native components are capitalized).
// Error 5: The API returns 'title' and 'body', not 'postTitle' and 'postBody'.

export default function App() {

  const [postList, setPostList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing,setRefresh] = useState(false);
  const [postTitle,setPostTitle] = useState("");
  const [postBody,setPostBody] = useState("");
  const [isPosting,setIsPosting] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async (limit = 10) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}`);
    const data = await response.json();
    setPostList(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  handleRefresh = () => {
    fetchData(20);
    setRefresh(false);
  }
  if(isLoading){
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="0000ff"/>
      </SafeAreaView>
    )
  }

  const addPost = async() => {
    setIsPosting(true);
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: postTitle,
            body: postBody,
          }),
        }
      );
      const newPost = await response.json();
      setPostList([newPost, ...postList]);
      setPostTitle("");
      setPostBody("");
      setError("");
    }
    catch(error){
      console.error("Error fetching data:", error);
      setIsLoading(false);
      setError("Failed to fetch post list.");
    }
    setIsPosting(false);
  }
  return (
    <SafeAreaView style={styles.container}>

      <View>
        <TextInput style={styles.input}
        placeholder='post heading'
        value={postTitle} 
        onChangeText={setPostTitle}/>

        <TextInput style={styles.input}
        placeholder='post content'
        value={postBody} 
        onChangeText={setPostBody}/>

        <Button title={isPosting?"..adding":"Add Post"}
        onPress={addPost}
        disabled={isPosting}/>
         
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={postList}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => {
            return (
              <View style={styles.card}>
                <Text style={styles.nameText}>{item.title}</Text>
                <Text style={styles.typeText}>{item.body}</Text>
              </View>
            );
          }}

          ItemSeparatorComponent={()=>(<View style = {{padding:10}}></View>)}
          ListHeaderComponent={(<Text style={styles.footerText}>Post List</Text>)}
          ListFooterComponent={
            <Text style={styles.footerText}>End of list</Text>
          }


          refreshing = {refreshing}
          onRefresh={handleRefresh}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: StatusBar.currentHeight,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'red',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingTop: StatusBar.currentHeight,
    justifyContent: "center", // Center the loading spinner
    alignItems: "center", // Center the loading spinner
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: 'green',
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  nameText: {
    fontSize: 30,
  },
  typeText: {
    fontSize: 24,
    color: "#666666",
  },
  headerText: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 12,
  },
  footerText: {
    fontSize: 24,
    textAlign: "center",
    marginTop: 12,
  },

  input: {
    flex:1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    borderWidth: 2
  }
});
