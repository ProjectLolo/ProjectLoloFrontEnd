import React, {useState,useEffect}from "react";
import * as firebase from "firebase";
import { View, Image, Button,
Text,
TouchableOpacity} 
from "react-native";
//Global Styles
import styles from "../../styles";
//local styles
import style from"./style";

import defaultProfile from  "./defaultProfile.png"


export default function UploadKidProfile ({ route }){

    const [picture,setPicture]=useState(defaultProfile)

uploadImage = async(uri,pictureName) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    let ref=firebase.storage().ref().child("ProfilePictures/" + pictureName);
    return ref.put(blob)

}

return (
<View style={[styles.fontFamily]}>
    <View>
        <Text style={[style.text,style.align]}>{`Welcome ${route.params.kidName} & family! Let's get started`}</Text>
    </View>
    <View>
        <Text style={[style.label,style.align]}>{`Please upload a profile picture of ${route.params.kidName} for your family`}</Text>
    </View>
    
    <View style={[style.alignImage]}>
        <Image style={[style.image]}source={picture} alt="no-pic-available"/>
    </View>
    <View>
        <Button title={`Upload Picture`} />
    </View>

    <View style={[style.row]}>
    <View style={[style.button, styles.teal]}>
        <TouchableOpacity onPress={() => navigation.navigate("UploadKidProfile")}>
            <Text style={style.button}>Skip this</Text>
        </TouchableOpacity>
    </View>
    <View style={[style.button, styles.dkPink]}>
        <TouchableOpacity onPress={() => navigation.navigate("UploadKidProfile")}>
            <Text style={style.button}>Continue</Text>
        </TouchableOpacity>
    </View>
    </View>


</View>
)}
