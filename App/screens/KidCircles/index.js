import React from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import styles from "../../styles" //have to changeit to @styles/styles
import style from "./style";

export default function KidCircles({ navigation }) {
  return (
    <View style={[ styles.fontFamily, style.container, style.spacing ]}>
      <Text style={[style.text]}>
      Welcome! Do you want to create a family or Join an existing family
      </Text>

      <View style={[style.spacing]}></View>

      <TouchableWithoutFeedback
        onPress={() => navigation.navigate("CreateKidCircle")}
      >
       <View style={[styles.button,{backgroundColor:"#6464E1"}]}>
            <Text style={styles.loginButtonText}>CREATE FAMILY</Text>
          </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback
        onPress={() => navigation.navigate("JoinKidCircle")}
      >
        <View style={[styles.button,{backgroundColor:"#F6ABA7"}]}>
            <Text style={styles.loginButtonText}>JOIN FAMILY</Text>
          </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
