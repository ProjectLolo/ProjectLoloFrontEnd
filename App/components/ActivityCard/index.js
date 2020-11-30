import React, { useState } from "react";
import { View, Dimensions, Image, Text } from "react-native";
import adjust from "../../styles/adjust";
import styles from "@styles/styles";
import colors from "@assets/colors";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

export default function ActivityCard(props) {
  const [working, setWorking] = useState(true);
  const navigation = useNavigation();
  const { image, nav, stories } = props;
  return (
    <View style={styles.cardContainer}>
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate(nav, { nav: nav, stories: stories });
        }}
      >
        <Image
          style={{
            width: Dimensions.get("window").width * 0.405,
            height: Dimensions.get("window").width * 0.405,
            borderRadius: 25,
          }}
          source={image}
        />
      </TouchableWithoutFeedback>
      {!working && (
        <View
          style={{
            position: "absolute",
            backgroundColor: "rgba(255, 255, 255, 0.6)",
            width: Dimensions.get("window").width * 0.405,
            height: Dimensions.get("window").width * 0.405,
            borderRadius: 25,
            justifyContent: "center",
          }}
        >
          <Text
            style={[
              styles.titleText,
              {
                color: colors.purple,
                fontSize: adjust(16),
              },
            ]}
          >
            Under construction
          </Text>
        </View>
      )}
    </View>
  );
}
