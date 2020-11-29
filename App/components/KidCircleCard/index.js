import React, { useContext } from "react";
import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import adjust from "../../styles/adjust";
import styles from "@styles/styles";
import colors from "@assets/colors";
import fonts from "@assets/fonts";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/Auth";
import images from "@assets/images";

export default function KidCircleCard(props) {
  const { activeKid, kidName: kName } = useContext(AuthContext);
  const navigation = useNavigation();
  const { id, kidName, kidImage, deleteCircle } = props;

  function handlePress(e) {
    e.preventDefault();
    activeKid(id);
    kName(kidName);

    navigation.navigate("Recommended", { id, kidName });
  }
  return (
    <View
      style={{
        marginBottom: "20%",

        justifyContent: "center",
      }}
    >
      <TouchableWithoutFeedback
        onPress={() =>
          /*This should bring user to the correct Recommended page, for now passing the kids name in param*/ navigation.navigate(
            "Recommended",
            { id, kidName }
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
            backgroundColor:
              kidImage && kidImage !== "http://google.com" ? null : "white",
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
            style={
              kidImage && kidImage !== "http://google.com"
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
            source={
              kidImage && kidImage !== "http://google.com"
                ? { uri: kidImage }
                : images.monkey
            }
          />
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback
        onPress={() => {
          deleteCircle(id);
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            width: "16.5%",
            height: Dimensions.get("window").width * 0.15,
            justifyContent: "center",
            alignSelf: "center",
            padding: 5,
            borderRadius: "50%",
            shadowColor: "black",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.1,
            shadowRadius: 50,
            marginTop: "5%",
          }}
        >
          <View
            style={{
              width: "80%",
              height: "80%",
              alignSelf: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: colors.purple,
                fontFamily: fonts.bold,
                fontSize: adjust(16),
              }}
            >
              X
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
