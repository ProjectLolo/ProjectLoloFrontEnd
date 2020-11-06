import React from "react";
import { View, TouchableWithoutFeedback, Text, Image } from "react-native";
import images from "@assets/images";
import styles from "@styles/styles";

export default function NavButtons(props) {
  const { page } = props;

  function today() {
    if (page === "Recommended") {
      return (
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("Library")}
        >
          <View style={{ borderWidth: 1, borderRadius: 10 }}>
            <Image
              style={{ width: 50, height: 50, alignSelf: "center" }}
              source={images.videoCameraYellow}
            />
            <Text style={styles.bottomText}>TODAY</Text>
          </View>
        </TouchableWithoutFeedback>
      );
    } else {
      return (
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("Library")}
        >
          <View>
            <Image
              style={{ width: 50, height: 50, alignSelf: "center" }}
              source={images.videoCameraYellow}
            />
            <Text style={styles.bottomText}>TODAY</Text>
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
      <TouchableWithoutFeedback onPress={() => navigation.navigate("Library")}>
        <View>
          <Image
            style={{ width: 50, height: 50, alignSelf: "center" }}
            source={images.videoCameraYellow}
          />
          <Text style={styles.bottomText}>TODAY</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => navigation.navigate("Library")}>
        <View>
          <Image
            style={{ width: 50, height: 50, alignSelf: "center" }}
            source={images.videoCameraYellow}
          />
          <Text style={styles.bottomText}>Love Bank</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => navigation.navigate("Library")}>
        <View>
          <Image
            style={{ width: 50, height: 50, alignSelf: "center" }}
            source={images.videoCameraYellow}
          />
          <Text style={styles.bottomText}>Create</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
