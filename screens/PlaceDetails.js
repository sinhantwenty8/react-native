import { useRoute } from "@react-navigation/native";
import { useCallback, useLayoutEffect, useState } from "react";
import { View,StyleSheet, ScrollView, TextInput,Text} from "react-native";
import ImagePicker from "../components/Places/ImagePicker";
import LocationPicker from "../components/Places/LocationPicker";
import IconButton from "../components/UI/IconButton";
import StyledButton from "../components/UI/StyledButton";
import { Colors } from "../constants/colors";
import { deletePlaces } from "../util/database";

function PlaceDetails({navigation}){
    const [pickedLocation,setPickedLocation] = useState();
    const [selectedImage,setSelectedImage] = useState()
    const route = useRoute()
    const place = route.params.location
    
    
    const pickedLocationHandler = useCallback((location)=>{
        setPickedLocation(place.location)
    },[])

    function takeImageHandler(imageUri){
        setSelectedImage(place.imageUri)
    }
    
    console.log(place.imageUri,"hi")

    async function deletePlaceHandler(){
        const deleteLocation = await deletePlaces(place)
        navigation.navigate('AllPlaces')
    }

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerRight:({tintColor}) =><IconButton icon='trash' size={24} color={tintColor} onPress={deletePlaceHandler} ></IconButton>
        })
    },[navigation])
    
    
    return<ScrollView style={styles.form}>
    <View style={styles.formContainer}>
        <View style={styles.labelContainer}>
            <Text style={styles.label}>Title</Text>
        </View>
        <TextInput 
        style={styles.input} defaultValue={place.title}/>
    </View>
    <ImagePicker style={styles.imageContainer}  onTakeImage={takeImageHandler} oriImage={place.imageUri}></ImagePicker>
    <LocationPicker style={styles.locationContainer} onPickLocation={pickedLocationHandler} ></LocationPicker>
    <View style={styles.button}>
        <StyledButton >Edit</StyledButton>
    </View>
</ScrollView>
}

export default PlaceDetails;

const styles = StyleSheet.create({
    form:{
        flex:1,
        padding:"6%",
        marginTop:10,
        marginLeft:15,
        marginRight:15,
    },
    label:{
        fontWeight:"bold",
        marginVertical:2,
        color:Colors.white,
        fontSize:16,
    },
    labelContainer:{
        padding:2,
        backgroundColor:Colors.deep_taupe,
        borderRadius:5,
        borderColor:Colors.deep_taupe,
        borderWidth:0.5,
        width:65,
        textAlign:"center",
        justifyContent:"center",
        alignItems:"center",
        shadowColor:Colors.black,
        shadowRadius:2,
        shadowOffset:{width:1,height:1},
        shadowOpacity:0.25,
        elevation:4,
    },
    input:{
        marginVertical:15,
        fontSize:16,
        fontWeight:"bold",
        borderBottomColor:Colors.deep_taupe,
        borderBottomWidth:2,
        width:"100%",
        height:"30%",
        color:Colors.deep_taupe
    },
    imageContainer:{
        flex:2,
        justifyContent:"center",
        alignItems:'center',
    },
    locationContainer:{
        flex:2,
    },
    formContainer:{
        flex:1
    },
    button:{
        flex:1,
    },
})