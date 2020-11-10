import React from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import styles from"@styles/styles"
import style from "./style"

export default function ShareFamilyCode({ route, navigation }) {
  return (
    <View style={[style.container]}>
       <Text style={[style.text]}>
      Share this code with your family to invite them
      </Text>

      <View>
        <Text style={[style.codetext]}>{`Your family code is ${route.params.familyCode}`}</Text>
      </View>

      <TouchableWithoutFeedback>
      
        <View style={[styles.teal, styles.button]}>
          <Text style={[styles.button]}>
            Share
          </Text>
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={()=>navigation.navigate("Recommended")}>
      
        <View style={[styles.purple, styles.button]}>
          <Text style={[styles.button]}>
            Continue
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
