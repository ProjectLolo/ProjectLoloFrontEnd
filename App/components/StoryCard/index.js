import React from "react";
import { View, Dimensions, Image, Text } from "react-native";
import styles from "@styles/styles";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

export default function ActivityCard(props) {
  const navigation = useNavigation();
  const { item } = props;
  console.log("DEMPAGES",item.pages)
  // Need to filter pages by story id then pass to Story component
  return (
    <View style={[styles.cardContainer]}>
      <TouchableWithoutFeedback onPress={() => navigation.navigate("Story", {pages:item.pages})}>
        {/* <Image
          style={{
            width: Dimensions.get("window").width * 0.405,
            height: Dimensions.get("window").width * 0.405,
            borderRadius: 25,
          }}
          source={image}
        /> */}
        <Text style={styles.bold}>{item.title}</Text>
      </TouchableWithoutFeedback>
    </View>
  );
}
