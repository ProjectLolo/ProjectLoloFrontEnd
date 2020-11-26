import React, { useEffect, useState } from "react";
import { View, TouchableWithoutFeedback, Text, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import images from "@assets/images";
import styles from "@styles/styles";
import colors from "../../assets/colors";

export default function NavButtons(props) {
  // const isFocused = useIsFocused();
  const [parent, setParent] = useState("");
  const navigation = useNavigation();
  const { screen, userId, kidName, kidData } = props;

  useEffect(() => {
    kidData &&
      kidData.findAllKids.find((kid) => {
        if (kid.name === kidName) {
          setParent(kid.userId);
        }
      });
  }, [kidData]);

  function create() {
    if (screen === "Recommended") {
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
    } else if (screen === "Single") {
      return null;
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
    if (screen === "LoveBank") {
      return (
        <TouchableWithoutFeedback>
          <View style={styles.navActiveBtContainer}>
            <Image style={styles.navBtImage} source={images.photography} />
            <Text style={styles.bottomText}>Love Bank</Text>
          </View>
        </TouchableWithoutFeedback>
      );
    } else if (screen === "Single") {
      return null;
    } else {
      return (
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("LoveBank", { kidData })}
        >
          <View style={styles.navBtContainer}>
            <Image style={styles.navBtImage} source={images.photography} />
            <Text style={styles.bottomText}>Love Bank</Text>
          </View>
        </TouchableWithoutFeedback>
      );
    }
  }

  function account() {
    if (screen === "Settings" || screen === "SettingsParent") {
      return (
        <TouchableWithoutFeedback>
          <View style={styles.navActiveBtContainer}>
            <Image style={styles.navBtImage} source={images.monkey} />
            <Text style={styles.bottomText}>Account</Text>
          </View>
        </TouchableWithoutFeedback>
      );
    } else if (screen === "Single") {
      return (
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("Settings", { screen: "single" })}
        >
          <View style={styles.navActiveBtContainer}>
            <Image style={styles.navBtImage} source={images.monkey} />
            <Text style={[styles.bottomText, { color: colors.purple }]}>
              Account
            </Text>
          </View>
        </TouchableWithoutFeedback>
      );
    } else {
      return (
        <TouchableWithoutFeedback
          onPress={() => {
            parent && parent === userId
              ? navigation.navigate("SettingsParent", { kidData })
              : navigation.navigate("Settings", { kidData });
          }}
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
      {create()}
      {loveBank()}
      {account()}
    </View>
  );
}
