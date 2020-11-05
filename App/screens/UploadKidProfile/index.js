import React from "react";
import { View,
Text,
TouchableOpacity } 
from "react-native";
//Global Styles
import styles from "../../styles";
import style from"./style";


export default function UploadKidProfile ({ route }){
return (
<View style={[styles.fontFamily]}>
    <View>
        <Text style={[style.text,style.align]}>{`Welcome ${route.params.kidName} & family! Let's get started`}</Text>
    </View>
    <View>
        <Text style={[style.label,style.align]}>{`Please upload a profile picture of ${route.params.kidName} for your family`}</Text>
    </View>

    <View style={{ flexDirection: "row" }}>
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
