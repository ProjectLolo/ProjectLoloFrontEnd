import React from "react";
import { StyleSheet, View, Text, TouchableWithoutFeedback } from "react-native";
import style from "../../styles" //have to changeit to @styles/styles

export default function KidCircles({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Text style={[styles.text, style.fontFamily]}>
      Welcome! Do you want to create a family or Join an existing family
      </Text>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate("CreateKidCircle")}
      >
        <View style={[style.purple,styles.spacing]}>
          <Text style={[style.button]}>
            CREATE FAMILY
          </Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate("JoinKidCircle")}
      >
         <View style={[style.pink,styles.spacing]}>
          <Text style={[style.button]}>
            JOIN FAMILY
          </Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate("Recommended")}
      >
        <Text style={{ textAlign: "center", marginTop: 50 }}>
          Press here to go to Recommended
        </Text>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles=StyleSheet.create({
  text:{
    fontSize:50,
    fontWeight:"bold",
    paddingLeft:15,
    paddingRight:10
  },
  spacing:{
    margin:15
  }
})