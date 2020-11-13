import React from "react";
import { View, Dimensions, Image } from "react-native";
import styles from "@styles/styles";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

export default function ActivityCard(props) {
  const navigation = useNavigation();
  const { image, nav } = props;
  return (
    <View style={styles.cardContainer}>
      <TouchableWithoutFeedback onPress={() => navigation.navigate(nav)}>
        <Image
          style={{
            width: Dimensions.get("window").width * 0.405,
            height: Dimensions.get("window").width * 0.405,
            borderRadius: 25,
          }}
          source={image}
        />
      </TouchableWithoutFeedback>
    </View>
  );
}
