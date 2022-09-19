import { View , Text, ScrollView, TextInput, StyleSheet} from "react-native";
import {useState,useCallback} from 'react'
import { Colors } from "../../constants/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import StyledButton from "../UI/StyledButton"
import { getAddress } from "../../util/location";
import { Place } from "../../models/place";

function PlaceForm({onCreatePlace}){
    const [enteredTitle, setEnteredTitle] = useState('');
    const [pickedLocation,setPickedLocation] = useState();
    const [selectedImage,setSelectedImage] = useState()

    const pickedLocationHandler = useCallback((location)=>{
        setPickedLocation(location)
    },[])

    function takeImageHandler(imageUrl){
        setSelectedImage(imageUrl)
    }

    function savePlaceHandler(){
        const placeData = new Place(enteredTitle,selectedImage,pickedLocation)
        onCreatePlace(placeData)
    }

    function changeTitleHandler(enteredText){
        setEnteredTitle(enteredText)
    }

    return<ScrollView style={styles.form}>
        <View style={styles.formContainer}>
            <View style={styles.labelContainer}>
                <Text style={styles.label}>Title</Text>
            </View>
            <TextInput 
            style={styles.input} 
            onChangeText={changeTitleHandler} 
            value={enteredTitle}/>
        </View>
        <ImagePicker style={styles.imageContainer} onTakeImage={takeImageHandler}></ImagePicker>
        <LocationPicker style={styles.locationContainer} onPickLocation={pickedLocationHandler}></LocationPicker>
        <View style={styles.button}>
            <StyledButton onPress={savePlaceHandler}>Add your place</StyledButton>
        </View>
    </ScrollView>
  
}

export default PlaceForm;

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