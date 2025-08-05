import { StyleSheet, Text, View } from "react-native";


export default function AboutScreen(){

    return(
        <View style={styles.container}>
            <Text>AboutScreen beta</Text>
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