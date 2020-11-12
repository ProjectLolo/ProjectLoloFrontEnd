import React from "react";
import { View, Text, Image } from "react-native";
import styles from "@styles/styles";
import colors from "@assets/colors";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

export default function ActivityCard(props) {
  const navigation = useNavigation();
  const { title, text, image, top1, top2, bottom1, bottom2, nav } = props;
  return (
    <View style={styles.cardContainer}>
      <TouchableWithoutFeedback onPress={() => navigation.navigate(nav)}>
        <View
          style={{
            backgroundColor: colors[top2],
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            width: 180,
          }}
        >
          <LinearGradient
            colors={[colors[top1], colors[top2]]}
            style={styles.linTop}
          >
            <Image style={[styles.cardImage]} source={image} />
          </LinearGradient>
        </View>
        <View
          style={{
            backgroundColor: colors[bottom1],
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 25,
          }}
        >
          <LinearGradient
            colors={[colors[bottom1], colors[bottom2]]}
            style={[styles.linBottom, { height: 60 }]}
          >
            <Text
              style={[styles.cardTitle, { width: 150, alignSelf: "center" }]}
              numberOfLines={1}
              adjustsFontSizeToFit={true}
            >
              {title}
            </Text>
            <Text
              style={[styles.cardText, { width: 150, alignSelf: "center" }]}
              numberOfLines={1}
              adjustsFontSizeToFit={true}
            >
              {text}
            </Text>
          </LinearGradient>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
