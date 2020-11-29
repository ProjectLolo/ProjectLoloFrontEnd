import React, { useState } from "react";
import {
  View,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
  Text,
  Image,
  Alert
} from "react-native";
import { useMutation } from "@apollo/client";
import styles from "@styles/styles";
import images from "@assets/images";
import colors from "../../assets/colors";
import adjust from "../../styles/adjust";
import NavHome from "../../components/NavHome";
import { RESET_PASSWORD } from "../../../graphql/mutations"

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);

  const [resetPassword, { data }] = useMutation(RESET_PASSWORD, {
    onCompleted(data) {
      console.log(data)
      if(data.forgotPassword == "false")
      {Alert.alert(
        'Something went wrong',
        `User with this email not found!`,
        [
          {text: "Cancel",
        onPress: () => console.log("Canceled"),
        style: 'cancel',
        }
        ]
  
      )} else if(data.forgotPassword == "true") {
        Alert.alert(
          'Succes!',
          `Check your email for your new password!`,
          [
            {text: "Continue",
          onPress: () => navigation.navigate("Welcome"),
          style: 'Continue',
          }
          ]
    
        )
      }
    },
   
  });


  function togglePassword() {
    hidePassword ? setHidePassword(false) : setHidePassword(true);
  }

  function reset() {
    resetPassword({
      variables: {
        email: email
      }
    })

  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
        <Image style={styles.peekabondLogo} source={images.peekabondLogo} />
        <Text style={[styles.title, { marginTop: "10%" }]}>Password Reset</Text>
        <Text
          style={[
            styles.titleText,
            {
              color: colors.purple,
              fontSize: adjust(12),
              marginTop: "5%",
              marginBottom: "10%",
            },
          ]}
        >
          Enter your email address and we'll send you instructions on how to
          reset your password.
        </Text>

        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          style={styles.inputBox}
          placeholder="Enter email..."
          placeholderTextColor="grey"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />

        <TouchableWithoutFeedback
          onPress={reset} //onPress should dispatch info to backend, to get Token in Redux. Then App.js should switch to the other StackNavigator.
        >
          <View style={[styles.loginButton, { marginTop: "15%" }]}>
            <Text style={styles.loginButtonText}>SUBMIT</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => navigation.navigate("Login")}>
          <Text style={styles.bottomText}>CANCEL</Text>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
}
