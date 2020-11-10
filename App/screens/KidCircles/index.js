import React from "react";
import { View, Text, TouchableWithoutFeedback, Image } from "react-native";
import styles from "@styles/styles"; //have to changeit to @styles/styles
import style from "./style";
import images from "@assets/images";
import NavButtons from "../../components/NavButtons";

export default function KidCircles({ navigation }) {
  const circles = [
    {
      id: 1,
      kidImage: images.monkey,
      kidName: "Atieh",
    },
    {
      id: 2,
      kidImage: images.monkey,
      kidName: "Weilong",
    },
    {
      id: 3,
      kidImage: images.monkey,
      kidName: "Nazneen",
    },
  ];

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-evenly",
      }}
    >
      <Image style={styles.peekabondLogo} source={images.peekabondLogo} />
      <Text style={styles.title} adjustsFontSizeToFit={true} numberOfLines={1}>
        Welcome back, [firstNameOfuser]!
      </Text>

      <View style={[style.spacing]}></View>

      <TouchableWithoutFeedback
        onPress={() => navigation.navigate("CreateKidCircle")}
      >
        <View style={[styles.ltPurple, styles.button]}>
          <Text style={[styles.button]}>Create Family</Text>
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback
        onPress={() => navigation.navigate("JoinKidCircle")}
      >
        <View style={[styles.pink, styles.button]}>
          <Text style={[styles.button]}>Join Family</Text>
        </View>
      </TouchableWithoutFeedback>
      <NavButtons screen="Single" />
    </View>
  );
}
