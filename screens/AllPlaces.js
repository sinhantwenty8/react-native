import {View} from "react-native"
import PlacesList from "../components/Places/PlacesList"
import OutlinedButton from "../components/UI/OutlinedButton"

function AllPlaces({navigation}){
    function navigateMapHandler(){
        navigation.navigate('Map')
    }
    return <View>
        <PlacesList></PlacesList>
        <OutlinedButton onPress={navigateMapHandler} icon='map' >Map</OutlinedButton>
    </View>

}

export default AllPlaces