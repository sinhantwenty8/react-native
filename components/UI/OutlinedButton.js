import {Pressable,Text,StyleSheet} from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from "../../constants/colors";

function OutlinedButton({onPress,children,icon}){
    return <Pressable style={({pressed})=>[styles.button,pressed && styles.pressed]} onPress={onPress}>
        <Ionicons style={styles.icon} name={icon} size={20} color={Colors.choco700}/>
        <Text style={styles.text}>{children}</Text>
    </Pressable>
}

export default OutlinedButton;

const styles = StyleSheet.create({
    button:{
        paddingHorizontal:12,
        paddingVertical:6,
        marginTop:"6%",
        marginBottom:"8%",
        flexDirection:"row",
        justifyContent:'center',
        alignItems:"center",
        borderWidth:1.5,
        borderColor:Colors.pink500
    },
    pressed:{
        opacity:0.7,
    },
    text:{
        marginRight:6,
        color:Colors.pink500,
        fontWeight:"bold",
    },
    icon:{
        color:Colors.pink500,
        marginRight:5,
    },
})