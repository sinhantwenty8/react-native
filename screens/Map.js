import MapView,{Marker} from "react-native-maps"
import {StyleSheet,Dimensions, Alert} from "react-native"
import {useCallback, useLayoutEffect, useState} from 'react'
import IconButton from "../components/UI/IconButton"

function Map({navigation}){
    const [selectedLocation,setSelectedLocation] = useState()
    const region ={
        latitude: 5.300784525474171,
        longitude: 100.265445166328,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    }

    function selectLocationHandler(event){
        const lat = event.nativeEvent.coordinate.latitude
        const lng = event.nativeEvent.coordinate.longitude

        setSelectedLocation({lat:lat,lng:lng})
        console.log(lat,lng,selectedLocation)
    }

    const savedPickedLocation =useCallback(()=> {
        console.log(selectedLocation)
        if(!selectedLocation){
            Alert.alert('No location picked!','You have to pick a location (by tapping on the map) first!')
            return
        }
        
        navigation.navigate('AddPlace',{pickedLat:selectedLocation.lat,pickedLng:selectedLocation.lng})

    },[navigation,selectedLocation])

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerRight:({tintColor}) =><IconButton icon='save' size={24} color={tintColor} onPress={savedPickedLocation}></IconButton>
        })
    },[navigation,savedPickedLocation])

    return <MapView initialRegion={region} style={styles.map} onPress={selectLocationHandler}>
        {selectedLocation && <Marker title="Picked Location" coordinate={{latitude:selectedLocation.lat,longitude:selectedLocation.lng}}/>}
    </MapView>
}

export default Map

const styles = StyleSheet.create({
    map:{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        flex:1,
    },
})