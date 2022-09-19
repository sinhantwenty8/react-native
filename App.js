import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllPlaces from './screens/AllPlaces'
import AddPlace from './screens/AddPlace'
import IconButton from './components/UI/IconButton';
import { Colors } from './constants/colors';
import Map from './screens/Map';
import PlaceDetails from './screens/PlaceDetails';
import { useEffect, useState } from 'react';
import { fetchPlaces, init } from './util/database';


const Stack = createNativeStackNavigator()

export default function App() {
  const [dbInitialized,setDbInitialized] = useState(false)


  useEffect(()=>{

    async function initializingDB() {
      const databaseInitialize = await init()
      return databaseInitialize
    }

    const i = initializingDB()
    if(i){
      setDbInitialized(true)  
    }
  },[])

  if(!dbInitialized){
    return <AppLoading></AppLoading>
  }

  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer style={styles.container}>
        <Stack.Navigator
          screenOptions={{
            headerStyle:{backgroundColor: Colors.cinereuos},
            headerTintColor: Colors.white,
            contentStyle:{backgroundColor:Colors.platinum}
          }}
        > 
          <Stack.Screen name='AllPlaces' component={AllPlaces} options={({navigation})=> ({
            title:"Your Favourite Places",
            headerRight:({tintColor}) => (
            <IconButton icon="add" size={24} color={tintColor}
            onPress={()=>{navigation.navigate('AddPlace')}}/>
            ),})}
          />
          <Stack.Screen name='AddPlace' component={AddPlace} 
            options={({navigation})=>({
              title:"Add a New Place",
            })}
          />
          <Stack.Screen name='Map' component={Map}/>
          <Stack.Screen name='PlaceDetails' component={PlaceDetails} options={({navigation})=>({
              title:"Place Details",
            })}/>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
