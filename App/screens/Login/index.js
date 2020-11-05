import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  TouchableWithoutFeedback,
  TextInput,
  StyleSheet,
  Keyboard,
  Text,
} from "react-native";
import style from "@styles/styles";

export default function Login({ navigation }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);

  function togglePassword() {
    hidePassword ? setHidePassword(false) : setHidePassword(true);
  }

  function login() {
    //dispatch(login(email, password));
    setEmail("");
    setPassword("");
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
        <Text style={style.title}>Login</Text>
        <Text style={style.inputLabel}>Email</Text>
        <TextInput
          style={style.inputBox}
          placeholder="Enter email..."
          placeholderTextColor="grey"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <Text style={style.inputLabel}>Password</Text>
        <TextInput
          style={style.inputBox}
          placeholder="Enter password..."
          placeholderTextColor="grey"
          secureTextEntry={hidePassword}
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        {password === "" ? null : (
          <TouchableWithoutFeedback onPress={togglePassword}>
            <Text style={style.showPassword}>
              {hidePassword ? "Show password" : "Hide password"}
            </Text>
          </TouchableWithoutFeedback>
        )}

        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("SignUp")} //onPress should dispatch info to backend, to get Token in Redux. Then App.js should switch to the other StackNavigator.
        >
          <View style={style.loginButton}>
            <Text style={style.loginButtonText}>LOGIN</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("Welcome")}
        >
          <Text style={style.bottomText}>FORGOT PASSWORD?</Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => navigation.navigate("SignUp")}>
          <Text style={style.bottomText}>SIGNUP</Text>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
}
