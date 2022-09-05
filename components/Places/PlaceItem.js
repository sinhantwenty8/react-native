import { Pressable, View, StyleSheet} from "react-native";

function PlaceItem({place,onSelect}){
  return <View>
    <Pressable onPress={onSelect}>
        <Image source = {{uri:place.imageUri}}>
            <View>
                <Text>{place.title}</Text>
                <Text>{place.address}</Text>
            </View>
        </Image>
    </Pressable>
  </View>
}

export default PlaceItem;

const styles = StyleSheet.create({

})