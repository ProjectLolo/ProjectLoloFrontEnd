import React from "react";
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import styles from "@styles/styles";
import colors from "@assets/colors";
import images from "@assets/images";

import { useNavigation } from "@react-navigation/native";

export default function MediaContentCard(props) {
  const navigation = useNavigation();
  const {
    title,
    person,
    topColor,
    bottomColor,
    video,
    loveBankId,
    likes,
    category,
  } = props;
  console.log(category);

  console.log("loveBankId");

  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate("MediaContentDetails", {
          title,
          person,
          topColor,
          bottomColor,
          video,
          loveBankId,
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
            backgroundColor: colors[bottomColor],
            justifyContent: "center",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 5,
          }}
        >
          <Image style={styles.cardImage} source={video} />
        </View>
        <View
          style={{
            backgroundColor: colors[topColor],
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
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
          <Text style={[styles.cardTitle, { paddingHorizontal: 5 }]}>
            <Image source={images.heart} style={style.heart} />
            {likes}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const style = StyleSheet.create({
  heart: {
    height: 20,
    width: 20,
  },
});
