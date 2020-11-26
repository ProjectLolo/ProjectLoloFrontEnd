import React, { useState } from "react";
import { View, Text, TouchableWithoutFeedback, Dimensions } from "react-native";
import { Picker } from "@react-native-picker/picker";
import styles from "@styles/styles";
import adjust from "../../styles/adjust";
import { useMutation } from "@apollo/client";
import { ADD_MEMBER } from "../../../graphql/mutations";
import NavHome from "../../components/NavHome";
import colors from "../../assets/colors";
import fonts from "@assets/fonts";

export default function CreateFamilyMember({ route, navigation }) {
  const [variables, setVariables] = useState({
    relation: "Father",
    notification: "1",
    kidId: route.params.data._id,
  });

  console.log("variables", variables);
  const [selectedValueRelation, setSelectedValueRelation] = useState("Father");
  //   const [selectedValueNotification, setSelectedValueNotification] = useState(
  //     "1"
  //   );

  const [AddFamilyMember, { error }] = useMutation(ADD_MEMBER, {
    onError: (error) => console.log("error: ", error.graphQLErrors),
    onCompleted: (data) => {
      console.log("result", data);
      navigation.navigate("KidCircles");
    },
  });

  function submitForm(e) {
    console.log(variables);
    e.preventDefault();
    AddFamilyMember({
      variables,
    });
  }

  return (
    <View style={{ flex: 1, justifyContent: "space-between" }}>
      <NavHome />

      <Text
        style={[styles.title, { marginTop: "0%" }]}
        adjustsFontSizeToFit={true}
        numberOfLines={1}
      >
        Choose relation to kid:
      </Text>
      <Picker
        selectedValue={variables.relation}
        itemStyle={{
          fontFamily: fonts.bold,
          color: colors.purple,
          fontSize: adjust(25),
        }}
        style={{
          height: Dimensions.get("window").width * 0.9,
          width: "90%",
          alignSelf: "center",
          marginTop: "20%",
          marginBottom: "0%",
        }}
        onValueChange={(itemValue, itemIndex) =>
          setVariables({ ...variables, relation: itemValue })
        }
      >
        <Picker.Item
          color={
            (variables.relation === "Father" || variables.relation === "") &&
            colors.dkPink
          }
          label="Father"
          value="Father"
        />
        <Picker.Item
          color={variables.relation === "Mother" && colors.dkPink}
          label="Mother"
          value="Mother"
        />
        <Picker.Item
          color={variables.relation === "Grand Father" && colors.dkPink}
          label="Grand Father"
          value="Grand Father"
        />
        <Picker.Item
          color={variables.relation === "Grand Mother" && colors.dkPink}
          label="Grand Mother"
          value="Grand Mother"
        />
        <Picker.Item
          color={variables.relation === "Aunt" && colors.dkPink}
          label="Aunt"
          value="Aunt"
        />
        <Picker.Item
          color={variables.relation === "Uncle" && colors.dkPink}
          label="Uncle"
          value="Uncle"
        />
        <Picker.Item
          color={variables.relation === "Guardian" && colors.dkPink}
          label="Guardian"
          value="Guardian"
        />
      </Picker>

      {/* Picker for notification if that gets added */}
      {/* <Picker
            selectedValue={variables.notification}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) =>
                setVariables({ ...variables, notification: itemValue })
            }
          >
            <Picker.Item label="once per day" value="1" />
            <Picker.Item label="three times per week" value="3" />
            <Picker.Item label="once per week" value="2" />
            <Picker.Item label="no notifications" value="0" />
          </Picker> */}

      <TouchableWithoutFeedback onPress={submitForm}>
        <View style={[styles.loginButton, { marginBottom: "10%" }]}>
          <Text style={styles.loginButtonText}>CONTINUE</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
