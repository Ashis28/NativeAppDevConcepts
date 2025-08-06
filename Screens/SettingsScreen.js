import React from "react";
import { StyleSheet, Text, View } from "react-native";

const SettingsScreen = () => {

    return(
        <View style = {styles.container}>
            <Text>Settings  Screen</Text>
        </View>
    )
}

export default SettingsScreen;

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