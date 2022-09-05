import { launchCameraAsync,PermissionStatus,useCameraPermissions } from "expo-image-picker"
import { useState } from "react";
import { Alert, Button, Image, StyleSheet, Text, View } from "react-native"
import { Colors } from "../../constants/colors";
import OutlinedButton from "../UI/OutlinedButton";

function ImagePicker(){
    const [cameraPermissionInformation, requestPermission] = useCameraPermissions();
    const [imagePicked, setImagePicked] = useState()

    async function verifyPermissions(){
        if(cameraPermissionInformation.status === PermissionStatus.UNDETERMINED){
            const permissionResponse = await requestPermission();

            return permissionResponse.granted;
        }

        if(cameraPermissionInformation.status === PermissionStatus.DENIED){
            Alert.alert("Insufficient Permissions!", "You need to grant camera permissions to use this app")
            return false;
        }

        return true;
    }

    async function takeImageHandler(){
        const hasPermission = await verifyPermissions(); 

        if(!hasPermission)return;

        const image = await launchCameraAsync({
            allowsEditing:true,
            aspect:[16,9],
            quality:0.5
        })
        setImagePicked(image.uri)
    }

    let imagePreview = <Text style={styles.imagePreviewText}>No Image Taken Yet</Text>
        

    if(imagePicked){
        imagePreview = <Image style={styles.image} source={{uri:imagePicked}}></Image>
    }

    return<View>
        <View style={styles.imagecontainer}>
            {imagePreview}
        </View>
        <OutlinedButton onPress={takeImageHandler} icon="camera" >Take Image</OutlinedButton>
    </View>
}

export default ImagePicker

const styles = StyleSheet.create({
    imagecontainer:{
        width:"100%",
        height:200,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:Colors.pink500,
        borderRadius:"5px",
        overflow:'hidden'
    },
    imagePreviewText:{
        color:Colors.white,
        textAlign:"center",
        fontSize:16,
        fontWeight:"300",
        marginTop:"40%",
        marginBottom:"40%",
        padding:"6%",
        paddingBottom:"12%",
        borderRadius:2,
    },

    image:{
        width:"100%",
        height:"100%",
        borderRadius:4
    }
})