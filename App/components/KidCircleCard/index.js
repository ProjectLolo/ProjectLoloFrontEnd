import React from "react";
import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import styles from "@styles/styles";
import colors from "@assets/colors";
import fonts from "@assets/fonts";
import { useNavigation } from "@react-navigation/native";

export default function KidCircleCard(props) {
  const navigation = useNavigation();
  const { id, kidName, kidImage } = props;
  return (
    <View
      style={{
        marginBottom: "20%",
      }}
    >
      <TouchableWithoutFeedback
        onPress={() =>
          /*This should bring user to the correct Recommended page, for now passing the kids name in param*/ navigation.navigate(
            "Recommended",
            { kidName }
          )
        }
      >
        <Text
          style={[
            styles.cardTitle,
            {
              color: colors.dkPink,
              fontFamily: fonts.semiBold,
              paddingBottom: 15,
            },
          ]}
        >
          {kidName}
        </Text>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() =>
          /*This should bring user to the correct Recommended page, for now passing the kids name in param*/ navigation.navigate(
            "Recommended",
            { kidName }
          )
        }
      >
        <View
          style={{
            backgroundColor: "white",
            width: "75%",
            height: Dimensions.get("window").width * 0.7,
            alignSelf: "center",
            justifyContent: "space-evenly",
            shadowColor: "black",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.05,
            shadowRadius: 5,
            borderRadius: 150,
          }}
        >
          <Image
            style={[
              styles.cardImage,
              { width: "100%", height: Dimensions.get("window").width * 0.3 },
            ]}
            source={kidImage}
          />
        </View>
      </TouchableWithoutFeedback>
      {/* 
      <Image
        style={[
          styles.cardImage,
          {
            backgroundColor: "blue",
            width: "90%",
            height: "90%",
            borderRadius: 100,
          },
        ]}
        source={kidImage}
      />
      <Text
        style={[
          styles.cardTitle,
          { color: colors.dkPink, backgroundColor: "yellow" },
        ]}
      >
        {kidName}
      </Text> */}
    </View>
  );
}
