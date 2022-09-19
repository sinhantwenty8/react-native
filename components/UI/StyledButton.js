import {Pressable,StyleSheet, Text} from "react-native";
import { Colors } from "../../constants/colors";

function StyledButton({onPress,children}){
    return <Pressable style={({pressed})=> [styles.button,pressed && styles.pressed]} onPress={onPress}>
        <Text style={styles.text}>{children}</Text>
    </Pressable>
};

export default StyledButton;

const styles = StyleSheet.create({
    button:{
        width:'100%',
        padding: 10,
        marginVertical:'7%',
        justifyContent: 'center',
        alignItems: 'center',
        elevation:2,
        backgroundColor:Colors.deep_taupe,
        borderRadius:4,
        shadowColor:Colors.black,
        shadowRadius:2,
        shadowOffset:{width:1,height:1},
        shadowOpacity:0.25,
        elevation:4
    },
    pressed:{
        opacity:0.7
    },
    text:{
        textAlign:"center",
        fontSize:15,
        color:Colors.white,
        fontWeight:"bold",
        shadowColor:Colors.black,
        shadowRadius:2,
        shadowOffset:{width:1,height:1},
        shadowOpacity:0.25,
        elevation:4
    }
})
