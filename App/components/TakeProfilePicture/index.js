import React,{useEffect,useState} from "react";

import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Camera } from 'expo-camera';

export default function TakeProfilePicture({route,navigation}){
  

    const [click, setClick] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);


  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);


const handleClick = () =>{
    route.params.takePhoto(cameraRef);
    navigation.navigate("UploadKidProfile");
}

  if (hasPermission === null) {
    return <View />;
  }

if (hasPermission === false) { 
    return <Text>No access to camera</Text>; 
}
return (
<View style={{ flex: 1 }}>
<Camera style={{ flex: 1 }} type={type} ref={(ref) => {
          setCameraRef(ref);
        }}>
  <View
    style={{
      flex: 1,
      backgroundColor: 'transparent',
      flexDirection: 'row',
    }}>
    <TouchableOpacity
      style={{
        flex: 0.1,
        alignSelf: 'flex-end',
        alignItems: 'center',
      }}
      onPress={() => {
        setType(
          type === Camera.Constants.Type.back
            ? Camera.Constants.Type.front
            : Camera.Constants.Type.back
        );
      }}>
           <TouchableOpacity
              style={{ alignSelf: "center" }}
              onPress={handleClick}
            >
                <View
                style={{
                  borderWidth: 2,
                  borderRadius: 25,
                  borderColor: "white",
                  height: 50,
                  width: 50,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    borderWidth: 2,
                    borderRadius: 25,
                    borderColor:click?"red":"white",
                    height: 40,
                    width: 40,
                  }}
                ></View>
              </View>
            </TouchableOpacity>
      <View style={{alignItems:"center"}}>
      <Ionicons
                name={
                  Platform.OS === "ios"
                    ? "ios-reverse-camera"
                    : "md-reverse-camera"
                }
                size={40}
                color="white"
              />
       </View>
    </TouchableOpacity>
   
  </View>
</Camera>
</View>
)}