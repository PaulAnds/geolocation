import React, {useState,useEffect} from 'react';
import {Text,View,Button} from 'react-native';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import styles from './styles';

const API_KEY = '';
const URL = `https://maps.google.com/maps/api/geocode/json?key=${API_KEY}&latlng=`;

export default function App(){
  const [address,setAddress] = useState("loading...");
  const [longitude,setLongitude] = useState();
  const [latitude,setLatitude] = useState();

  useEffect(()=> {
    function setPosition({coords: {latitude,longitude}}) {
      setLongitude(longitude);
      setLatitude(latitude);
      fetch(`${URL}${latitude}${longitude}`)
        .then((resp) => resp.json())
        .then(({results}) => {
          if(results.length > 0){
            setAddress(results[0].formatted_address);
          }
        })
        .catch((error)=> {
          console.log(error);
        });
    }

    let watcher;

    (async()=>{
      let {status} = await Location.requestForegroundPermissionsAsync();
      if(status !== "granted"){
        setErrorMsg("Permission denied");
        return;
      }
      
      let location = await Location.getCurrentPositionAsync({});
      setPosition(location);

      watcher = await Location.watchPositionAsync(
        {accuracy: Location.LocationAccuracy.Highest},
        setPosition
      );
    })();

    return() => {
      watcher?.remove();
    };
  },[]);

  return(
    <View style={styles.container}>
      <Text style={styles.label}>Address: <Text style={styles.italic}>{address}</Text></Text>
      <Text style={styles.label}>Latitude: <Text style={styles.italic}>{latitude}</Text></Text>
      <Text style={styles.label}>Longitude: <Text style={styles.italic}>{longitude}</Text></Text>
      <MapView style={styles.mapView} showsUserLocation followsUserLocation/>
    </View>
  )
}