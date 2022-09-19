import {View,StyleSheet,Alert,Image,Text} from 'react-native'
import { Colors } from '../../constants/colors'
import OutlinedButton from '../UI/OutlinedButton'
import {getCurrentPositionAsync, useForegroundPermissions,PermissionStatus} from 'expo-location'
import { useEffect, useState } from 'react'
import {getAddress, getMapPreview} from '../../util/location'
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native'

function LocationPicker({onPickLocation}){
    const navigation = useNavigation()
    const route = useRoute()
    const isFocused = useIsFocused()

    const[locationPermissionInformation,requestPermission] = useForegroundPermissions()
    const [pickedLocation,setPickedLocation] = useState()

    useEffect(()=>{
        if(isFocused && route.params){
            const mapPickedLocation = {lat:route.params.pickedLat,lng:route.params.pickedLng} 
            setPickedLocation(mapPickedLocation)
        }
        
    },[route,isFocused])

    useEffect(()=>{
        async function handleLocation(){
            if(pickedLocation){
                const address = await getAddress(pickedLocation.lat,pickedLocation.lng)
                onPickLocation({...pickedLocation,address})
            }
        }
        handleLocation()
    },[pickedLocation,onPickLocation])

    async function verifyPermissions(){
        
        if(locationPermissionInformation.status === PermissionStatus.UNDETERMINED || locationPermissionInformation.status === undefined){
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }

        if(locationPermissionInformation.status === PermissionStatus.DENIED){
            Alert.alert("Insufficient Permissions!", "You need to grant location permissions to use this app")
            return false;
        }

        return true;
    }

    async function getLocationHandler(){
        const hasPermission = await verifyPermissions(); 
        if(!hasPermission)return;

        const location = await getCurrentPositionAsync()
        setPickedLocation({
            lat:location.coords.latitude,
            lng:location.coords.longitude,
            address:getAddress(location.coords.latitude,location.coords.longitude)
        })
    
    }

    let locationPreview = <Text style={styles.locationPreviewText}>No Location Picked Yet</Text>
    
    if(pickedLocation){
        locationPreview = <Image style={styles.image} source={{uri:getMapPreview(pickedLocation.lat,pickedLocation.lng)}}></Image>
    }
    
    function pickOnMapHandler(){
        navigation.navigate('Map')
    }

    return <View style={styles.container}>
        <View style={styles.mapPreview}>
            {locationPreview}
        </View>
        <View style={styles.buttonContainer}>
            <OutlinedButton icon="location" onPress={getLocationHandler}>Locate User</OutlinedButton>
            <OutlinedButton icon="map" onPress={pickOnMapHandler}>Pick on Map</OutlinedButton>
        </View>
        
    </View>
}

const styles= StyleSheet.create({
    container:{
        width:'100%',
        height:'35%',
    },
    mapPreview:{
        width:'100%',
        height:180,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:Colors.cinereuos,
        borderRadius:4,
    },
    buttonContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    locationPreviewText:{
        color:Colors.white,
        textAlign:"center",
        fontSize:15,
        fontWeight:"300",
        marginTop:"40%",
        marginBottom:"40%",
        padding:"6%",
        paddingBottom:"12%",
        borderRadius:2,
        shadowColor:Colors.black,
        shadowRadius:1,
        shadowOffset:{width:1,height:1},
        shadowOpacity:0.25,
        elevation:2
    },
    image:{
        width:'100%',
        height:"100%",
        borderRadius:4,
    }
})

export default LocationPicker