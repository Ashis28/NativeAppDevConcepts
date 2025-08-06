import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

const SettingsScreen = ({navigation}) => {

    return(
        <View style = {styles.container}>
            <Text>Settings  Screen</Text>
            <Button title="Toggle Drawer" onPress={()=>{navigation.jumpTo("DashboardScreen")}}/>
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