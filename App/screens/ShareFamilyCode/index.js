import React from "react";
import { Share, View, Text, TouchableWithoutFeedback } from "react-native";
import styles from "@styles/styles";
import NavHome from "../../components/NavHome";
import colors from "../../assets/colors";

export default function ShareFamilyCode({ route, navigation }) {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Hi!! Use this code to join my family circle ${route.params.familyCode}`,
      });
      console.log("Nazneen result:", result);
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
      console.log("Sharing familycode failed with error:", error.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "space-between" }}>
      <NavHome />
      <Text style={[styles.title, { marginTop: "10%" }]}>
        Share this <Text style={{ color: colors.dkPink }}>code</Text> with your
        family to invite them:
      </Text>

      <View style={{ marginTop: "20%" }}>
        <Text style={[styles.title, { color: colors.dkPink }]}>
          {route.params.familyCode}
        </Text>

        <TouchableWithoutFeedback onPress={onShare}>
          <View style={[styles.loginButton, { marginTop: "5%", width: "50%" }]}>
            <Text style={styles.loginButtonText}>SHARE CODE</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>

      <TouchableWithoutFeedback
        onPress={() => navigation.navigate("Recommended")}
      >
        <View
          style={[
            styles.loginButton,
            { marginBottom: "10%", marginTop: "50%" },
          ]}
        >
          <Text style={styles.loginButtonText}>CONTINUE</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
