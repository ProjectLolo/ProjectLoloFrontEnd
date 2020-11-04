import React from "react";
import {
  View,
  TouchableWithoutFeedback,
  Image,
  StyleSheet,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import images from "@assets/images";
import { CText } from "@components/ctext";

export default function Login({ navigation }) {
  //On Login, user should login, token should be made and received. When token is there, will switch to KidCircle screen. (instead of navigate to Signup)

  return (
    <KeyboardAwareScrollView style={{ flex: 1 }}>
      <CText h4 bold purple center title={"Login"} style={styles.login} />
      <TouchableWithoutFeedback onPress={() => navigation.navigate("SignUp")}>
        <CText center title={"Press here to continue"} style={styles.top} />
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={() => navigation.navigate("Welcome")}>
        <CText center title={"back to welcome"} style={styles.top} />
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  top: { marginTop: 50 },
  login: { marginTop: 100 },
});
