import React, { useState } from "react";
import { View, Text, TextInput, TouchableWithoutFeedback } from "react-native";
import styles from "@styles/styles";
import style from "./style";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { FIND_KID_BY_CODE } from "../../../graphql/queries";
import NavHome from "../../components/NavHome";
import colors from "@assets/colors";
import fonts from "@assets/fonts";

export default function JoinKidCircles({ navigation }) {
  const [familyCode, setFamilyCode] = useState("");
  const [successMessage, setSuccessMessage] = useState({ text: "", color: "" });

  const [findKidByCode, { error }] = useLazyQuery(FIND_KID_BY_CODE, {
    onError: (error) =>
      error.graphQLErrors.map(({ message }, i) =>
        setSuccessMessage({ text: message, color: "dkPink" })
      ),
    onCompleted: (data) => {
      console.log("result", data);
      navigation.navigate("CreateFamilyMember", {
        data: data.findKidByCode,
      });
    },
  });

  function submitForm(e) {
    e.preventDefault();
    findKidByCode({ variables: { code: familyCode } });
  }

  function showMessage() {
    if (successMessage.text !== "" && successMessage.color !== "") {
      setTimeout(() => {
        setSuccessMessage({ text: "", color: "" });
      }, 2000);
      return (
        <View>
          <Text
            style={[
              styles.cardText,
              {
                color: colors[successMessage.color],
                fontFamily: fonts.semiBold,
                paddingVertical: 15,
                marginBottom: "-15%",
              },
            ]}
          >
            {successMessage.text}
          </Text>
        </View>
      );
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: "space-between" }}>
      <NavHome />
      <View style={{ marginBottom: "65%" }}>
        <View style={{ marginBottom: "25%" }}>
          <Text
            style={styles.title}
            adjustsFontSizeToFit={false}
            numberOfLines={2}
          >
            Please enter your family code to join the circle!
          </Text>
          <Text
            style={{
              color: colors.purple,
              fontFamily: fonts.regular,
              textAlign: "center",
            }}
          >
            The code is provided by the creator of the family circle.
          </Text>
        </View>
        <View>
          <Text style={styles.inputLabel}>Enter Code</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="Enter family code..."
            placeholderTextColor="grey"
            onChangeText={(text) => setFamilyCode(text)}
            value={familyCode}
          />
          {showMessage()}
        </View>
      </View>
      <TouchableWithoutFeedback onPress={submitForm}>
        <View style={[styles.loginButton, { marginBottom: "10%" }]}>
          <Text style={styles.loginButtonText}>CONFIRM</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
