import React from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
  TouchableOpacity,
} from "react-native";
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
          height: Dimensions.get("window").width * 0.77,
          width: "80%",
          alignSelf: "center",
          borderRadius: 25,
          padding: 20,
          shadowColor: "black",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 1,
          shadowRadius: 150,
        }}
      >
        <View
          style={[
            styles.cardContainer,
            { marginBottom: "15%", marginTop: "5%" },
          ]}
        >
          <Text style={[styles.cardTitle, { color: colors.dkPink }]}>
            Change Profile Picture
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("TakeProfilePicture")}
        >
          <View style={[styles.cardContainer, { marginBottom: "11%" }]}>
            <Text
              style={[
                styles.cardText,
                { fontFamily: fonts.semiBold, color: colors.purple },
              ]}
            >
              New Profile Picture
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={[styles.cardContainer, { marginBottom: "11%" }]}>
            <Text
              style={[
                styles.cardText,
                { fontFamily: fonts.semiBold, color: colors.purple },
              ]}
            >
              Select From Gallery
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={[styles.cardContainer, { marginBottom: "11%" }]}>
            <Text
              style={[
                styles.cardText,
                { fontFamily: fonts.semiBold, color: colors.purple },
              ]}
            >
              Delete Profile Picture
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
