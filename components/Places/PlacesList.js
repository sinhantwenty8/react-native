import { FlatList, StyleSheet,View,Text,} from "react-native";
import { Colors } from "../../constants/colors";
import PlaceItem from "./PlaceItem";

function PlacesList({places}){
    if (!places || places.length === 0){
        return <View style = {styles.fallbackContainer}>
            <Text style ={styles.fallbackText }> No place added yet.</Text>
        </View>
    }

    return <View styles={styles.container}>
        <FlatList 
    data={places} 
    keyExtractor={(item)=>item.id} 
    renderItem={({item}) => <PlaceItem place={item}/> }
    />
    </View>
}

export default PlacesList;

const styles = StyleSheet.create({
    fallbackContainer: {
        flex:1,
        justifyContent : "center",
        alignItems: "center"
    },
    fallbackText:{
        fontSize: 16,
        color:Colors.pink500
    },
    container:{
        width:"100%",
        height:"100%",
        flex:1,
      },
})