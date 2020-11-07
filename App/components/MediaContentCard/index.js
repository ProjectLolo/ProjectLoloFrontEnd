import React from "react";
import { View, Text, Image } from "react-native";
import styles from "@styles/styles";
import images from "@assets/images";
import colors from "@assets/colors";

export default function MediaContentCard(props) {
  const { title, person, topColor, bottomColor } = props;
  return (
    <View
      style={[
        styles.cardContainer,
        { borderRadius: 20, width: 180, height: 120, marginTop: 30 },
      ]}
    >
      <View
        style={{
          backgroundColor: colors[topColor],
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 35,
          justifyContent: "center",
        }}
      >
        <Text
          style={[styles.cardTitle, { paddingHorizontal: 5 }]}
          adjustsFontSizeToFit={true}
          numberOfLines={1}
        >
          {title} by {person}
        </Text>
      </View>
      <View
        style={{
          backgroundColor: colors[bottomColor],
          justifyContent: "center",
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          padding: 5,
        }}
      >
        <Image style={styles.cardImage} source={images.videoCameraPurple} />
      </View>
    </View>
  );
}
