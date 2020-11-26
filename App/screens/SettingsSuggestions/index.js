import React, { useState } from "react";
import { View, Text, TextInput, TouchableWithoutFeedback } from "react-native";
import NavHome from "../../components/NavHome";
import NavButtons from "../../components/NavButtons";
import styles from "@styles/styles";
import colors from "@assets/colors";
import fonts from "@assets/fonts";

export default function SettingsSuggestions() {
  const [userMessage, setUserMessage] = useState("");
  const [message, setMessage] = useState({ text: "", color: "" });

  function submitForm(e) {
    e.preventDefault();

    console.log("message", userMessage);
    //create query to send message to backend/nodemailer
    //onSuccess setMessage({ text: "Success! Thank you for your message.", color: "dkTeal" }), onError setMessage({text: errorMessage, color: "dkPink"})
    setMessage({
      text: `Success! \n \n Thank you for your message.`,
      color: "dkTeal",
    });
  }

  function showMessage() {
    if (message.text !== "" && message.color !== "") {
      console.log("message.color", message.color);
      return (
        <View style={{ marginBottom: "5%", marginTop: "-5%" }}>
          <Text
            style={[
              styles.cardText,
              {
                color: colors[message.color],
                fontFamily: fonts.semiBold,
                paddingVertical: 15,
              },
            ]}
          >
            {message.text}
          </Text>
        </View>
      );
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: "space-between" }}>
      <NavHome />

      {message.text !== "" ? (
        showMessage()
      ) : (
        <Text style={[styles.title, { marginTop: "10%" }]}>
          Do you have a suggestion or just a question? Enter your message below:
        </Text>
      )}
      {message.text === "" && (
        <TextInput
          style={[styles.inputBox, { height: "30%" }]}
          multiline={true}
          placeholder="Write your message here..."
          placeholderTextColor="grey"
          onChangeText={(text) => setUserMessage(text)}
        />
      )}

      {message.text === "" && (
        <TouchableWithoutFeedback onPress={submitForm}>
          <View style={styles.loginButton}>
            <Text style={styles.loginButtonText}>SEND</Text>
          </View>
        </TouchableWithoutFeedback>
      )}
      <NavButtons screen="Settings" />
    </View>
  );
}
