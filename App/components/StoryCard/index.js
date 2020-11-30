import React from "react";
import { View, Dimensions, Image, Text, StyleSheet } from "react-native";
import styles from "@styles/styles";
import SvgUri from "expo-svg-uri";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

export default function ActivityCard(props) {
  const navigation = useNavigation();
  const { item } = props;
  // console.log("DEMPAGES", item.pages);
  // Need to filter pages by story id then pass to Story component
  return (
    <View style={[styles.cardContainer, styles.ltPurple, style.card]}>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate("Story", { pages: item.pages })}
      >
        {item.pages[0].image ? (
          <SvgUri
            width={style.image.width}
            height={style.image.width}
            style={[styles.ltPurple, styles.cardImage, style.image]}
            source={{ uri: item.pages[0].image }}
          />
        ) : (
          <Image
            style={[styles.ltpurple, styles.cardImage, style.image]}
          ></Image>
        )}
        <Text style={[styles.bold, styles.cardText]}>{item.title}</Text>
      </TouchableWithoutFeedback>
    </View>
  );
}

const style = StyleSheet.create({
  card: {
    width: Dimensions.get("window").width * 0.405,
    height: Dimensions.get("window").width * 0.405,
    borderRadius: 25,
    textAlign: "center",
  },
  image: {
    width: Dimensions.get("window").width * 0.305,
    height: Dimensions.get("window").width * 0.305,
    borderRadius: 25,
    paddingTop: 5,
  },
});
