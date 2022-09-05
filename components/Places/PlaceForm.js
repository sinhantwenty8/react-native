import { View , Text, ScrollView, TextInput, StyleSheet} from "react-native";
import {useState} from 'react'
import { Colors } from "../../constants/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";


function PlaceForm(){
    const [enteredTitle, setEnteredTitle] = useState('');

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
        <ImagePicker></ImagePicker>
        <LocationPicker></LocationPicker>
    </ScrollView>
  
}

export default PlaceForm;

const styles = StyleSheet.create({
    form:{
        flex:1,
        padding:"6%",
        marginTop:10,
        marginLeft:10,
        marginRight:15,
    },
    label:{
        fontWeight:"bold",
        marginBottom:4,
        color:Colors.pink500,
        fontSize:17,
    },
    labelContainer:{
        padding:2,
        backgroundColor:Colors.white,
        borderRadius:10,
        borderColor:Colors.pink500,
        borderWidth:2,
        width:65,
        overflow:"hidden",
        textAlign:"center",
        justifyContent:"center",
        alignItems:"center",
    },
    input:{
        marginVertical:8,
        marginHorizontal:4,
        paddingVertical:15,
        fontSize:16,
        borderBottomColor:Colors.pink500,
        borderBottomWidth:2,
        width:"100%",
        height:"20%",
        color:Colors.pink500,
    },
    formContainer:{
        marginBottom:"-20%"
    }
})