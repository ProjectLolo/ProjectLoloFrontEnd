import React, { useContext } from "react";
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
import { AuthContext } from "../../context/Auth";

export default function KidCircleCard(props) {
  const { activeKid } = useContext(AuthContext);
  const navigation = useNavigation();
  const { id, kidName, kidImage } = props;

  function handlePress(e) {
    e.preventDefault();
    console.log("hi there from KidCircleCard!", id);
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
            styles.cardText,
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
      <TouchableWithoutFeedback onPress={handlePress}>
        <View
          style={{
            backgroundColor: "white",
            width: "100%",
            height: Dimensions.get("window").width * 0.5,
            alignSelf: "center",
            justifyContent: "space-evenly",
            shadowColor: "black",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.05,
            shadowRadius: 5,
            borderRadius: 100,
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
