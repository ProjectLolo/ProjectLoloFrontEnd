import React from "react";
import { View, Text, Dimensions } from "react-native";
import fonts from "@assets/fonts";
import colors from "@assets/colors";
import adjust from "../../styles/adjust";
import styles from "@styles/styles";

export default function FamilyMembers({ relation, name }) {
  return (
    <View
      style={{
        flexDirection: "column",
        width: "40%",
        marginHorizontal: "5%",
        marginTop: "5%",
      }}
    >
      <Text
        style={[
          styles.inputLabel,
          {
            color: colors.purple,
            paddingTop: 0,
            textAlign: "left",
            marginLeft: 0,
          },
        ]}
      >
        {relation}
      </Text>
      <View
        style={{
          width: "100%",
          height: Dimensions.get("window").width * 0.1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontFamily: fonts.regular,
            color: colors.black,
            fontSize: adjust(16),
            marginTop: Dimensions.get("window").width * 0.015,
          }}
        >
          {name}
        </Text>
      </View>
    </View>
  );
}
