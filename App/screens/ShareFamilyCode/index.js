import React from "react";
import { Share, View, Text, TouchableWithoutFeedback } from "react-native";
import styles from"@styles/styles"
import style from "./style"
import { HeaderBackground } from "@react-navigation/stack";

export default function ShareFamilyCode({ route, navigation }) {

    const onShare = async () => {
        try {
          const result = await Share.share({
            message: `Hi!! Use this code to join my family circle ${route.params.familyCode}`,
          });
          console.log("Nazneen result:",result)
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          //alert(error.message);
          console.log("Sharing familycode failed with error:", error.message)
        }
      };

  return (
    <View style={[style.container]}>
       <Text style={[style.text]}>
      Share this code with your family to invite them
      </Text>

      <View>
        <Text style={[style.codetext]}>{`Your family code is ${route.params.familyCode}`}</Text>
      </View>

      <TouchableWithoutFeedback onPress={onShare}>
          <View style={[styles.button,{backgroundColor:"#11E9E0"}]}>
            <Text style={styles.loginButtonText}>SHARE CODE</Text>
          </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={()=>navigation.navigate("Recommended")}>
          <View style={[styles.button,{backgroundColor:"#6464E1"}]}>
            <Text style={styles.loginButtonText}>CONTINUE</Text>
          </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
