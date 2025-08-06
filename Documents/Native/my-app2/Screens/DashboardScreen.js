import { useNavigation } from "@react-navigation/native";
import { Button, StyleSheet, Text, View } from "react-native";


const DashboardScreen = ({navigation}) => {

    return(
        <View style = {styles.container}>
            <Text>Dashboard Screen</Text>

            <Button title="Toggle Drawer" onPress={()=>{navigation.toggleDrawer()}}/>
        </View>
    )
}

export default DashboardScreen;

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