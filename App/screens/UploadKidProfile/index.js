import React, {useState, useEffect} from "react";
import * as firebase from "firebase";
import * as ImagePicker from "expo-image-picker";

import { Camera } from 'expo-camera';
import { View,
Button,
Image,
Text,
TouchableOpacity } 
from "react-native";
import styles from "../../styles"; //global styles
import style from"./style"; //local styles

export default function UploadKidProfile ({ route,navigation }){

    const [hasPermission, setHasPermission] = useState(null); 
    const [picture,setPicture]=useState("https://www.kindpng.com/picc/m/33-332538_boy-icon-01-01-cartoon-hd-png-download.png");

 // asks permission from used to use camera 
 useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
        else setHasPermission(status === "granted")
      }
    })();
  }, []);

  //Choose picture from device
 const pickPhoto = async () => { 
     let result = await ImagePicker.launchImageLibraryAsync({ 
         mediaTypes: ImagePicker.MediaTypeOptions.All, 
         allowsEditing: true, 
         aspect: [3, 4], 
         quality: 1, 
        });
        
    console.log(result);
    
    if (!result.cancelled) { 
        console.log("pickPhoto result.uri", result)
        uploadImage (result.uri, "profile")
        setPicture(result.uri); 
    } 
};


//Take picture using camera
const takePhoto = async (ref) => {
  let result = await ref.takePictureAsync(); 
  if (result){
      console.log("takePhoto result.uri", result)
      uploadImage (result.uri, "profile")
      setPicture(result.uri); 
  }
}

//upload image to firebase
 const uploadImage = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = firebase
      .storage()
      .ref()
      .child("images/" + imageName);
    return ref.put(blob);
  };

  if (hasPermission === null) {
    return <View />;
  }

if (hasPermission === false) { 
    return <Text>No access to camera</Text>; 
}
    //console.log("props:",props)
return (
<View style={[styles.fontFamily]}>
    <View>
        <Text style={[style.text,style.align]}>{`Welcome ${route.params.kidName || 'Kid'} & family! Let's get started`}</Text>
    </View>
    <View>
        <Text style={[style.label,style.align,style.spacing]}>
          {`This is the default picture. Please upload a profile picture of ${route.params.kidName || 'Kid'} for your family.`}
        </Text>
    </View>

   <View style={[{flexDirection:"row"}]}>
       <View>
       {picture && <Image source={{ uri:picture }} 
        alt="no-picture"
        style={[style.image]}
    />}
    </View>
    <View style={[style.spacing,{alignSelf:"center"}]}>
    <Button title="Pick a photo" onPress={pickPhoto} />
    <Button title="Take Picture" 
    onPress={()=> navigation.navigate("TakeProfilePicture",{takePhoto})} /> 
    </View>
    </View>
   
     <View style={[{ flexDirection: "row"},style.spacing]}>
    <View style={[style.button, styles.yellow]}>
        <TouchableOpacity onPress={() => navigation.navigate("UploadKidProfile")}>
            <Text style={style.button}>Skip this</Text>
        </TouchableOpacity>
    </View>
    <View style={[style.button, styles.dkPink]}>
        <TouchableOpacity onPress={() => navigation.navigate("Recommended")}>
            <Text style={style.button}>Continue</Text>
        </TouchableOpacity>
    </View>
    </View> 
</View>
)}
