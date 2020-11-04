import React, { useState } from "react";
import {
  View,
  TouchableWithoutFeedback,
  TextInput,
  StyleSheet,
  Keyboard,
} from "react-native";
import { CText } from "@components/ctext";
import style from "@styles/styles";

export default function Login({ navigation }) {
  //On Login, user should login, token should be made and received. When token is there, will switch to KidCircle screen. (instead of navigate to Signup)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);

  function togglePassword() {
    hidePassword ? setHidePassword(false) : setHidePassword(true);
  }

  return (
    <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
      <View>
        <CText
          h4
          bold
          purple
          center
          title={"Login"}
          style={styles.loginTitle}
        />
        <CText p regular black title={"Email"} style={styles.inputTitle} />
        <TextInput
          style={[styles.input, style.regular]}
          placeholder="Enter email..."
          placeholderTextColor="grey"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <CText p regular black title={"Password"} style={styles.inputTitle} />
        <TextInput
          style={[styles.input, style.regular]}
          placeholder="Enter password..."
          placeholderTextColor="grey"
          secureTextEntry={hidePassword}
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("SignUp")} //onPress should dispatch info to backend, to get Token in Redux. Then App.js should switch to the other StackNavigator.
        >
          <View style={[style.purple, styles.login, styles.top]}>
            <CText p semiBold center white title={"LOGIN"} />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("Welcome")}
        >
          <CText
            p
            semiBold
            grey
            center
            title={"FORGOT PASSWORD?"}
            style={styles.top}
          />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => navigation.navigate("SignUp")}>
          <CText p semiBold grey center title={"SIGNUP"} style={styles.top} />
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  top: { marginTop: "10%" },
  loginTitle: { marginTop: "20%", marginBottom: "5%" },
  login: {
    width: "90%",
    padding: "4.5%",
    alignSelf: "center",
    borderRadius: 5,
  },
  inputTitle: {
    marginLeft: "5%",
    paddingBottom: 5,
    paddingTop: "5%",
  },
  input: {
    alignSelf: "center",
    textAlign: "left",
    width: "90%",
    height: "10%",
    fontSize: 16,
    paddingLeft: 15,
    borderWidth: 0.2,
    borderColor: "grey",
    borderRadius: 5,
  },
});
