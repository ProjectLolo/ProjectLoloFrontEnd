import React from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import NavHome from "../../components/NavHome";
import NavButtons from "../../components/NavButtons";
import MediaContentCard from "../../components/MediaContentCard";
import styles from "@styles/styles";

export default function LoveBank({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "space-evenly" }}>
      <NavHome />
      <Text style={styles.titleText}>Welcome to [kid]'s love bank!</Text>
      <MediaContentCard />
      <TouchableWithoutFeedback onPress={() => navigation.navigate("Settings")}>
        <Text style={{ textAlign: "center", marginTop: 50 }}>
          Press here to go to Settings
        </Text>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate("MediaContentDetails")}
      >
        <Text style={{ textAlign: "center", marginTop: 50 }}>
          Press here to go to MediaContentDetails
        </Text>
      </TouchableWithoutFeedback>
      <NavButtons screen="LoveBank" />
    </View>
  );
}
