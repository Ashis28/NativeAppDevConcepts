import { useNavigation } from "@react-navigation/native";
import { Button, StyleSheet, Text, View } from "react-native";


export default function HomeScreen({route}){
    const navigation = useNavigation();  //this is done using hooks can be done through prop also
    //const dataFromAbout = route.params;
    return(
        <View style={styles.container}>
            <Text>HOME beta</Text>
            <Button  title="About Screen" 
            onPress={()=>navigation.navigate("About" , {name:"Vishwas"})}/>
            <Text>{route.params?.results}</Text>
        </View>
    );
}


const styles = StyleSheet.create({
   
    container:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    text:{
        fontSize: 24,
        fontWeight: "bold",
        margin: 10,
    }
}
)