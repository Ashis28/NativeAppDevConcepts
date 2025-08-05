import { useLayoutEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

//all the screens component has this prop route which get the data from the stacked screen
export default function AboutScreen({route,navigation}){
    const {name} = route.params;

    useLayoutEffect(()=>{
        navigation.setOptions({
            title:name,
        })
    },[navigation,name])
    return(
        <View style={styles.container}>
            <Text>AboutScreen beta {name}</Text>

            <Button title = "Update the name" onPress={()=> {navigation.setParams({name:"CodeEvolution"})}} />

            <Button
                title="GO back to Home with data"
                onPress={() => navigation.navigate("HOME", { results: `AboutScreen name is ${name}` })}
            />
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