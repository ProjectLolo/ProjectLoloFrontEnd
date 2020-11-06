import React from "react";
import { View, TouchableWithoutFeedback, Text, Image } from "react-native";
import images from "@assets/images";
import styles from "@styles/styles";

import { useNavigation } from "@react-navigation/native";

export default function NavButtons(props) {
  const navigation = useNavigation();
  const { page } = props;

  function today() {
    if (page === "Recommended") {
      return (
        <TouchableWithoutFeedback>
          <View style={styles.navActiveBtContainer}>
            <Image
              style={styles.navBtImage}
              source={images.videoCameraYellow}
            />
            <Text style={styles.bottomText}>Create</Text>
          </View>
        </TouchableWithoutFeedback>
      );
    } else {
      return (
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("Recommended")}
        >
          <View style={styles.navBtContainer}>
            <Image
              style={styles.navBtImage}
              source={images.videoCameraYellow}
            />
            <Text style={styles.bottomText}>Create</Text>
          </View>
        </TouchableWithoutFeedback>
      );
    }
  }

  function loveBank() {
    if (page === "LoveBank") {
      return (
        <TouchableWithoutFeedback>
          <View style={styles.navActiveBtContainer}>
            <Image style={styles.navBtImage} source={images.photography} />
            <Text style={styles.bottomText}>Love Bank</Text>
          </View>
        </TouchableWithoutFeedback>
      );
    } else {
      return (
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("LoveBank")}
        >
          <View style={styles.navBtContainer}>
            <Image style={styles.navBtImage} source={images.photography} />
            <Text style={styles.bottomText}>Love Bank</Text>
          </View>
        </TouchableWithoutFeedback>
      );
    }
  }

  function create() {
    if (page === "Settings") {
      return (
        <TouchableWithoutFeedback>
          <View style={styles.navActiveBtContainer}>
            <Image style={styles.navBtImage} source={images.monkey} />
            <Text style={styles.bottomText}>Account</Text>
          </View>
        </TouchableWithoutFeedback>
      );
    } else {
      return (
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("Settings")}
        >
          <View style={styles.navBtContainer}>
            <Image style={styles.navBtImage} source={images.monkey} />
            <Text style={styles.bottomText}>Account</Text>
          </View>
        </TouchableWithoutFeedback>
      );
    }
  }

  return (
    <View style={styles.navBtsContainer}>
      {today()}
      {loveBank()}
      {create()}
    </View>
  );
}
