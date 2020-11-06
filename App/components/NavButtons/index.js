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
          <View style={{ borderWidth: 1, borderRadius: 10, padding: 5 }}>
            <Image
              style={{
                width: 50,
                height: 50,
                alignSelf: "center",
              }}
              source={images.videoCameraYellow}
            />
            <Text style={styles.bottomText}>Today</Text>
          </View>
        </TouchableWithoutFeedback>
      );
    } else {
      return (
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("Recommended")}
        >
          <View style={{ padding: 5 }}>
            <Image
              style={{ width: 50, height: 50, alignSelf: "center" }}
              source={images.videoCameraYellow}
            />
            <Text style={styles.bottomText}>Today</Text>
          </View>
        </TouchableWithoutFeedback>
      );
    }
  }

  function loveBank() {
    if (page === "LoveBank") {
      return (
        <TouchableWithoutFeedback>
          <View style={{ borderWidth: 1, borderRadius: 10, padding: 5 }}>
            <Image
              style={{ width: 50, height: 50, alignSelf: "center" }}
              source={images.videoCameraYellow}
            />
            <Text style={styles.bottomText}>Love Bank</Text>
          </View>
        </TouchableWithoutFeedback>
      );
    } else {
      return (
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("LoveBank")}
        >
          <View style={{ padding: 5 }}>
            <Image
              style={{ width: 50, height: 50, alignSelf: "center" }}
              source={images.videoCameraYellow}
            />
            <Text style={styles.bottomText}>Love Bank</Text>
          </View>
        </TouchableWithoutFeedback>
      );
    }
  }

  function create() {
    if (page === "Library") {
      return (
        <TouchableWithoutFeedback>
          <View style={{ borderWidth: 1, borderRadius: 10, padding: 5 }}>
            <Image
              style={{ width: 50, height: 50, alignSelf: "center" }}
              source={images.videoCameraYellow}
            />
            <Text style={styles.bottomText}>Create</Text>
          </View>
        </TouchableWithoutFeedback>
      );
    } else {
      return (
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("Library")}
        >
          <View style={{ padding: 5 }}>
            <Image
              style={{ width: 50, height: 50, alignSelf: "center" }}
              source={images.videoCameraYellow}
            />
            <Text style={styles.bottomText}>Create</Text>
          </View>
        </TouchableWithoutFeedback>
      );
    }
  }

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginBottom: "10%",
      }}
    >
      {today()}
      {loveBank()}
      {create()}
    </View>
  );
}
