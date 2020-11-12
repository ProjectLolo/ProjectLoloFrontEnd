import React, { useState } from "react";
import { View, Text, TextInput, TouchableWithoutFeedback } from "react-native";
import styles from "@styles/styles";
import style from "./style";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { FIND_KID_BY_CODE } from "../../../graphql/queries";

export default function JoinKidCircles({ navigation }) {
  const [familyCode, setFamilyCode] = useState("");

  const [findKidByCode, { error }] = useLazyQuery(FIND_KID_BY_CODE, {
    onError: (error) =>
      error.graphQLErrors.map(({ message }, i) => alert(`${message}`)),
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

  return (
    <View style={[style.container, style.spacing]}>
      <Text style={styles.title} adjustsFontSizeToFit={false} numberOfLines={2}>
        Joining a family! Please enter your family code
      </Text>

      <View>
        <Text style={[style.label, style.spacing]}>
          {`The code is provided by the owner of the family.`}
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
      </View>
      <TouchableWithoutFeedback onPress={submitForm}>
        <View style={styles.loginButton}>
          <Text style={styles.loginButtonText}>CONFIRM</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
