import { launchCameraAsync,PermissionStatus,useCameraPermissions } from "expo-image-picker"
import { useEffect, useState } from "react";
import { Alert, Button, Image, StyleSheet, Text, View } from "react-native"
import { Colors } from "../../constants/colors";
import OutlinedButton from "../UI/OutlinedButton";

function ImagePicker({onTakeImage,oriImage}){
    const [cameraPermissionInformation, requestPermission] = useCameraPermissions();
    const [imagePicked, setImagePicked] = useState()

    useEffect(()=>{
        console.log(oriImage,"haha")
        if(oriImage){
            setImagePicked(oriImage)
            onTakeImage(oriImage)
        }
    },[imagePicked,setImagePicked])

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
        onTakeImage(image.uri)
    }

    let imagePreview = <Text style={styles.imagePreviewText}>No Image Taken Yet</Text>
        

    if(imagePicked){
        imagePreview = <Image style={styles.image} source={{uri:imagePicked}}></Image>
    }

    return<View style={styles.container}>
        <View style={styles.imagecontainer}>
            {imagePreview}
        </View>
        <OutlinedButton onPress={takeImageHandler} icon="camera" >Take Image</OutlinedButton>
    </View>
}

export default ImagePicker

const styles = StyleSheet.create({
    container:{
        marginBottom:"3%"
    },
    imagecontainer:{
        width:"100%",
        height:180,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:Colors.cinereuos,
        borderRadius:"5px",
        overflow:'hidden',
        alignSelf:'center',
    },
    imagePreviewText:{
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
        width:"100%",
        height:"100%",
        borderRadius:4,
    }
})