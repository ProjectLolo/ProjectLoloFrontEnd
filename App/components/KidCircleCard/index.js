import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import styles from "@styles/styles";
import colors from "@assets/colors";
import fonts from "@assets/fonts";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/Auth";
import images from "@assets/images";

export default function KidCircleCard(props) {
  const { activeKid } = useContext(AuthContext);
  const navigation = useNavigation();
  const { id, kidName, kidImage } = props;

  function handlePress(e) {
    e.preventDefault();
    activeKid(id);

    navigation.navigate("Recommended", { kidName });
  }
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
            { _id, kidName }
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
          {kidName && kidName}
        </Text>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={handlePress}>
        <View
          style={{
            backgroundColor: kidImage ? null : "white",
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
          {kidImage ? (
            <Image
              style={
                kidImage
                  ? {
                      borderRadius: 150,
                      width: 290,
                      height: 290,
                      alignSelf: "center",
                    }
                  : [
                      styles.cardImage,
                      {
                        width: "100%",
                        height: Dimensions.get("window").width * 0.3,
                      },
                    ]
              }
              source={kidImage ? { uri: kidImage } : images.monkey}
            />
          ) : (
            <ActivityIndicator
              style={{ marginBottom: "76.5%" }}
              size="large"
              color={colors.dkPink}
            />
          )}
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
