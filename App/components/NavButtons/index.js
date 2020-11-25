import React from "react";
import { View, TouchableWithoutFeedback, Text, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import images from "@assets/images";
import styles from "@styles/styles";
import colors from "../../assets/colors";

import { useQuery } from "@apollo/client";
import { GET_ALL_KIDS } from "../../../graphql/queries";

export default function NavButtons(props) {
  const navigation = useNavigation();
  const { screen, userId, kidName } = props;

  const { data, loading: dataLoading } = useQuery(GET_ALL_KIDS, {
    variables: {
      userId: userId,
    },
    onCompleted(fetchedData) {},
  });
  console.log("DATA? HERE?", data);
  console.log("active user id", userId);
  console.log("KIDNAME", kidName);

  const parent =
    data &&
    data.findAllKids.find((kid) => {
      if (kid.name === kidName) {
        return kid.userId;
      }
    });

  console.log("PARENT ID", parent && parent.userId);

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

  function account() {
    if (screen === "Settings") {
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
            parent && parent.userId === userId
              ? navigation.navigate("SettingsParent")
              : navigation.navigate("Settings");
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
