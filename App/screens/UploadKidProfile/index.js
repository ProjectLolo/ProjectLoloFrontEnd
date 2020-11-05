import React from "react";
import { StyleSheet,
View,
Text,
TouchableOpacity } 
from "react-native";
//Global Styles
import style from "../../styles"


export default function UploadKidProfile ({ route }){
return (
<View style={[style.fontFamily]}>
    <View>
        <Text style={[styles.text,styles.align]}>{`Welcome ${route.params.kidName} & family! Let's get started`}</Text>
    </View>
    <View>
        <Text style={[styles.label,styles.align]}>{`Please upload a profile picture of ${route.params.kidName} for your family`}</Text>
    </View>

    <View style={{ flexDirection: "row" }}>
    <View style={[styles.button, style.teal]}>
        <TouchableOpacity onPress={() => navigation.navigate("UploadKidProfile")}>
            <Text style={styles.button}>Skip this</Text>
        </TouchableOpacity>
    </View>
    <View style={[styles.button, style.purple]}>
        <TouchableOpacity onPress={() => navigation.navigate("UploadKidProfile")}>
            <Text style={style.button}>Continue</Text>
        </TouchableOpacity>
    </View>
    </View>


</View>
)}

const styles=StyleSheet.create({
    align:{
        alignContent:"center",
        paddingTop:30,
        paddingLeft:15,
        paddingRight:15,
    },
    text:{
        fontSize:50,
        fontWeight:"bold", 
      },
    label:{
        fontSize:16
    },
    button:{
        width:150,
  fontSize:24,
  textAlign:"center",
  alignItems:"center",
  margin:10,
  borderRadius:5
    },
})