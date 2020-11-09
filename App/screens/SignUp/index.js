import React, { useState } from "react";
import {
  View,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
  Text,
} from "react-native";
import styles from "@styles/styles";
import { useMutation } from "@apollo/client";
import { SIGNUP } from "../../../graphql/mutations";

export default function SignUp({ navigation }) {
  const [variables, setVariables] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [hidePassword, setHidePassword] = useState(true);

  const [signup, { error }] = useMutation(SIGNUP, {
    onError: (error) => console.log("hi", error.graphQLErrors),
    onCompleted({ signup }) {
      console.log("completed", signup);
      if (signup.error) {
        set_errorState(<Alert variant="danger">{signup.error}</Alert>);
      }
      // TODO: get login in and get token(?)
      if (signup.user && signup.token) {
        // dispatch(loginSuccess(login));
        navigation.navigate("Welcome");
      }
    },
  });

  function togglePassword() {
    hidePassword ? setHidePassword(false) : setHidePassword(true);
  }

  function submitForm(e) {
    e.preventDefault();
    signup({ variables });
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>Sign up</Text>
        <Text style={styles.inputLabel}>First name</Text>
        <TextInput
          style={styles.inputBox}
          placeholder="Enter first name..."
          placeholderTextColor="grey"
          onChangeText={(text) =>
            setVariables({ ...variables, firstName: text })
          }
          value={variables.firstName}
        />
        <Text style={styles.inputLabel}>Last name</Text>
        <TextInput
          style={styles.inputBox}
          placeholder="Enter last name..."
          placeholderTextColor="grey"
          onChangeText={(text) =>
            setVariables({ ...variables, lastName: text })
          }
          value={variables.lastName}
        />
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          style={styles.inputBox}
          placeholder="Enter email..."
          placeholderTextColor="grey"
          onChangeText={(text) => setVariables({ ...variables, email: text })}
          value={variables.email}
        />
        <Text style={styles.inputLabel}>Password</Text>
        <TextInput
          style={styles.inputBox}
          placeholder="Enter password..."
          placeholderTextColor="grey"
          secureTextEntry={hidePassword}
          onChangeText={(text) =>
            setVariables({ ...variables, password: text })
          }
          value={variables.password}
        />
        {!variables.password ? null : (
          <TouchableWithoutFeedback onPress={togglePassword}>
            <Text style={styles.showPassword}>
              {hidePassword ? "Show password" : "Hide password"}
            </Text>
          </TouchableWithoutFeedback>
        )}
        <TouchableWithoutFeedback
          // onPress={() => navigation.navigate("Welcome")} //onPress should dispatch info to backend, to get Token in Redux. Then App.js should switch to the other StackNavigator.
          onPress={submitForm}
        >
          <View style={styles.loginButton}>
            <Text style={styles.loginButtonText}>SIGNUP</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => navigation.navigate("Login")}>
          <Text style={styles.bottomText}>ALREADY HAVE AN ACCOUNT?</Text>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
}
