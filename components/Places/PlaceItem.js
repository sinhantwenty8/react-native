import { Pressable, View, StyleSheet,Image,Text} from "react-native";
import { Colors } from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";

function PlaceItem({place,onSelect}){
  const navigation = useNavigation()

  function onChangeScreen(){
    navigation.navigate('PlaceDetails',{location:place})
  }  

  return <View>
    <Pressable onPress={onChangeScreen} style={({pressed})=> [pressed && styles.pressed]}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Image  style={styles.image} source = {{uri:place.imageUri}}></Image>
          <View style={styles.text}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{place.title}</Text>
              </View>
              <View style={styles.addressContainer}>
                <Text style={styles.address}>{place.address}</Text>
              </View>
          </View>
        </View>
      </View>
    </Pressable>
  </View>
}

export default PlaceItem;

const styles = StyleSheet.create({
  image:{
    flex:1,
    width:"80%",
    height:200,
    marginTop:"9%",
    marginBottom:"5%",
    borderRadius:5,
  },
  card:{
    borderRadius:20,
    flex:1,
    alignItems:"center",
    justifyContent:"center",
    textAlign:'center',
    backgroundColor:Colors.white,
    marginHorizontal:"7%",
    marginVertical:"4%",
    shadowColor:Colors.black,
    shadowRadius:4,
    shadowOffset:{width:2,height:2},
    shadowOpacity:0.3,
  },
  text:{
    justifyContent:"center",
    alignItems:'center'
  },
  title:{
    fontWeight:"bold",
    marginVertical:2,
    color:Colors.white,
    fontSize:16,
  },
  titleContainer:{
    padding:2,
    backgroundColor:Colors.deep_taupe,
    borderRadius:5,
    borderColor:Colors.deep_taupe,
    borderWidth:2,
    width:"100%",
    textAlign:"center",
    justifyContent:"center",
    alignItems:"center",
    marginBottom:"3%",
    marginTop:"4%",
    paddingHorizontal:"4%",
    shadowColor:Colors.black,
    shadowRadius:2,
    shadowOffset:{width:1,height:1},
    shadowOpacity:0.25,
  },
  address:{
    fontSize:12,
    fontWeight:"400",
    textAlign:"center",
  },
  addressContainer:{
    marginBottom:"8%",
    marginTop:"3%",
    marginHorizontal:"10%",
  },
  pressed:{
    opacity:0.75
  }

})