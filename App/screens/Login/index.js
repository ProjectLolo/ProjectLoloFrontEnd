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

  const styles = StyleSheet.create({
    showPassword: {
      textAlign: "right",
      fontSize: 16,
      right: "10%",
      marginTop: 5,
    },
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
    inputEmail: {
      alignSelf: "center",
      textAlign: "left",
      width: "90%",
      height: 60,
      fontSize: 16,
      paddingLeft: 15,
      borderWidth: 0.2,
      borderColor: "grey",
      borderRadius: 5,
    },
    inputPassword: {
      alignSelf: "center",
      width: "90%",
      height: 60,
      paddingLeft: 15,
      paddingTop: 18,
      borderWidth: 0.2,
      borderColor: "grey",
      borderRadius: 5,
      flexDirection: "row",
    },
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
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
          style={[styles.inputEmail, style.regular]}
          placeholder="Enter email..."
          placeholderTextColor="grey"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <CText p regular black title={"Password"} style={styles.inputTitle} />

        <TextInput
          style={[
            styles.inputPassword,
            style.regular,
            { textAlign: "left", fontSize: 16 },
          ]}
          placeholder="Enter password..."
          placeholderTextColor="grey"
          secureTextEntry={hidePassword}
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        {password === "" ? null : (
          <TouchableWithoutFeedback onPress={togglePassword}>
            <CText
              p
              semiBold
              grey
              title={hidePassword ? "Show password" : "Hide password"}
              style={styles.showPassword}
            />
          </TouchableWithoutFeedback>
        )}

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
