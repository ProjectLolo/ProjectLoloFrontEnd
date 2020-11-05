import React, { useState } from "react";
import {
  View,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
  Text,
} from "react-native";
import styles from "@styles/styles";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);

  function togglePassword() {
    hidePassword ? setHidePassword(false) : setHidePassword(true);
  }

  function loginUser() {
    setEmail("");
    setPassword("");
    console.log("email", email);
    console.log("password", password);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          style={styles.inputBox}
          placeholder="Enter email..."
          placeholderTextColor="grey"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <Text style={styles.inputLabel}>Password</Text>
        <TextInput
          style={styles.inputBox}
          placeholder="Enter password..."
          placeholderTextColor="grey"
          secureTextEntry={hidePassword}
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        {password === "" ? null : (
          <TouchableWithoutFeedback onPress={togglePassword}>
            <Text style={styles.showPassword}>
              {hidePassword ? "Show password" : "Hide password"}
            </Text>
          </TouchableWithoutFeedback>
        )}

        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("Welcome")} //onPress should dispatch info to backend, to get Token in Redux. Then App.js should switch to the other StackNavigator.
        >
          <View style={styles.loginButton}>
            <Text style={styles.loginButtonText}>LOGIN</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("Welcome")}
        >
          <Text style={styles.bottomText}>FORGOT PASSWORD?</Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.bottomText}>SIGNUP</Text>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
}
