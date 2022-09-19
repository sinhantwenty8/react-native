import { useIsFocused } from "@react-navigation/native"
import { useEffect,useState} from "react"
import {View} from "react-native"
import PlacesList from "../components/Places/PlacesList"
import OutlinedButton from "../components/UI/OutlinedButton"
import { deletePlaces, fetchPlaces } from "../util/database"

function AllPlaces({route}){
    const isFocused = useIsFocused();
    const [loadedPlaces,setLoadedPlaces] = useState([]);
    
    useEffect(()=>{
        if(isFocused){
            async function fetchPlacesFromDB(){
                const i = await fetchPlaces()
                setLoadedPlaces(i)
                console.log(loadedPlaces)
                return i 
            }
        
            fetchPlacesFromDB()
           
        }
    },[isFocused])

    return <View>
        <PlacesList places={loadedPlaces}></PlacesList>
    </View>

}

export default AllPlaces