import React from "react";
import { View, Text, Image, TouchableWithoutFeedback } from "react-native";
import styles from "@styles/styles";
import colors from "@assets/colors";

import { useNavigation } from "@react-navigation/native";

export default function MediaContentCard(props) {
  const navigation = useNavigation();
  const { title, person, topColor, bottomColor, video } = props;

  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate("MediaContentDetails", {
          title,
          person,
          topColor,
          bottomColor,
          video,
        })
      }
    >
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
          <Image style={styles.cardImage} source={video} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
