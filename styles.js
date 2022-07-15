import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'ghostwhite',
    },
    label:{
        textAlign: 'center',
        fontWeight: 'bold',
        margin: 10,
        fontSize: 21,
        color: 'purple'
    },
    italic:{
        fontWeight: 'none',
        fontStyle: 'italic',
    },
    mapView:{
        alignSelf: 'stretch',
        height: 500,
        margin: 30,
    }
  });
  
export default styles; 
