import { useEffect } from "react";
import { StyleSheet } from "react-native";
import PlaceForm from "../components/Places/PlaceForm";
import { addPlaces, fetchPlaces } from "../util/database";

function AddPlace({navigation}){
      
    function createPlaceHandler(place){
        navigation.navigate('AllPlaces',{
            place:place
        })
        addPlaces(place)
        const places = fetchPlaces()
        console.log(places,"addplace")
    }

    return <PlaceForm style={styles.placeformContainer} onCreatePlace={createPlaceHandler}/>
}

export default AddPlace;

const styles = StyleSheet.create({
    placeformContainer:{
        flex:1,
    },

})