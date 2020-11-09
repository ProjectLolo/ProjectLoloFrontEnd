import React from "react";
import { View, Text, TouchableWithoutFeedback, Dimensions } from "react-native";
import styles from "@styles/styles";
import fonts from "@assets/fonts";
import colors from "@assets/colors";
import { useNavigation } from "@react-navigation/native";

export default function ChangeProfilePicture(props) {
  const navigation = useNavigation();
  const { hide } = props;
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(52, 52, 52, 0.4)",
        position: "absolute",
        top: 0,
        justifyContent: "center",
      }}
    >
      <TouchableWithoutFeedback onPress={hide}>
        <View
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(52, 52, 52, 0.4)",
            position: "absolute",
            top: 0,
            justifyContent: "center",
          }}
        ></View>
      </TouchableWithoutFeedback>
      <View
        style={{
          backgroundColor: "white",
          height: Dimensions.get("window").width * 0.5,
          width: "80%",
          alignSelf: "center",
          borderRadius: 25,
          justifyContent: "space-between",
          padding: 20,
        }}
      >
        <View style={[styles.cardContainer]}>
          <Text style={[styles.cardTitle, { color: colors.dkPink }]}>
            Change Profile Picture
          </Text>
        </View>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("TakeProfilePicture")}
        >
          <View style={styles.cardContainer}>
            <Text
              style={[
                styles.cardText,
                { fontFamily: fonts.semiBold, color: colors.grey },
              ]}
            >
              New Profile Picture
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <View style={[styles.cardContainer, { marginBottom: "5%" }]}>
            <Text
              style={[
                styles.cardText,
                { fontFamily: fonts.semiBold, color: colors.grey },
              ]}
            >
              Select From Gallery
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}
