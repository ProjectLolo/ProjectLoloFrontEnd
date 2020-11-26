import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from "react-native";
import NavHome from "../../components/NavHome";
import NavButtons from "../../components/NavButtons";
import styles from "@styles/styles";
import images from "@assets/images";
import colors from "@assets/colors";
import fonts from "@assets/fonts";

import { GET_ALL_KIDS, FIND_USER_BY_ID } from "../../../graphql/queries";
import { useIsFocused } from "@react-navigation/native";
import { useQuery, Query } from "@apollo/client";

export default function SettingsParent({ route, navigation }) {
  const isFocused = useIsFocused();
  const [kidImage, setKidImage] = useState("");
  const [parentImage, setParentImage] = useState("");
  const [parentName, setParentName] = useState("");
  const [kidName, setKidName] = useState("");

  const { data, refetch } = useQuery(GET_ALL_KIDS, {
    variables: {
      userId: route.params.activeUser,
    },
    onError: (error) => {
      console.log("SETTINGS GET_ALL_KIDS ERROR: ", error);
    },
    onCompleted(data) {
      const kid = data.findAllKids.find((kid) => {
        if (kid.name === route.params.kidName) {
          return true;
        }
      });
      console.log("kid data", kid);
    },
  });

  const query2 = useQuery(FIND_USER_BY_ID, {
    variables: {
      id: route.params.activeUser,
    },
    onError: (error) => {
      console.log("SETTINGS FIND_USER_BY_ID ERROR: ", error);
    },
    onCompleted(data) {
      console.log("parent data", data);
    },
  });

  useEffect(() => {
    refetch();

    if (
      data &&
      query2.client.cache.data.data[`User:${route.params.activeUser}`]
    ) {
      const kid = data.findAllKids.find((kid) => {
        if (kid.name === route.params.kidName) {
          return true;
        }
      });

      setKidImage(kid && kid.profileImageUrl && kid.profileImageUrl);
      setKidName(kid && kid.name);
      setParentImage(
        query2.client.cache.data.data[`User:${route.params.activeUser}`]
          .profilePic
          ? query2.client.cache.data.data[`User:${route.params.activeUser}`]
              .profilePic
          : ""
      );
      setParentName(
        query2.client.cache.data.data[`User:${route.params.activeUser}`]
          .firstName
      );
    }
  }, [refetch, data, query2, isFocused]);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
      }}
    >
      <NavHome />
      <Text style={[styles.title, { marginTop: 0, marginBottom: 0 }]}>
        Please choose the settings you want to go to:
      </Text>
      <TouchableWithoutFeedback onPress={() => navigation.navigate("Settings")}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View
            style={{
              backgroundColor: "white",
              width: "48.5%",
              height: Dimensions.get("window").width * 0.485,
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
              style={{
                borderRadius: 150,
                resizeMode: parentImage ? "cover" : "contain",
                width: parentImage ? "100%" : "90%",
                height: parentImage ? "100%" : "90%",
                alignSelf: "center",
              }}
              source={parentImage ? { uri: parentImage } : images.monkey}
            />
          </View>

          <View
            style={{
              position: "absolute",
              width: "48.5%",
              height: Dimensions.get("window").width * 0.485,
              alignSelf: "center",
              justifyContent: "space-evenly",
              shadowColor: "black",
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.05,
              shadowRadius: 5,
              borderRadius: 150,
            }}
          >
            <View
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.75)",
                width: "60%",
                height: "60%",
                alignSelf: "center",
                justifyContent: "center",
                shadowColor: "black",
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.05,
                shadowRadius: 5,
                borderRadius: 150,
              }}
            >
              <Text
                style={[
                  styles.cardTitle,
                  {
                    marginTop: "10.5%",
                    alignSelf: "center",
                    textAlign: "center",
                    color: colors.dkPink,
                    fontFamily: fonts.semiBold,
                    paddingBottom: 15,
                    width: "90%",
                  },
                ]}
                numberOfLines={1}
                adjustsFontSizeToFit={true}
              >
                {parentName}
              </Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate("SettingsKid")}
      >
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View
            style={{
              backgroundColor: "white",
              width: "48.5%",
              height: Dimensions.get("window").width * 0.485,
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
              style={{
                borderRadius: 150,
                resizeMode: kidImage ? "cover" : "contain",
                width: kidImage ? "100%" : "90%",
                height: kidImage ? "100%" : "90%",
                alignSelf: "center",
              }}
              source={kidImage ? { uri: kidImage } : images.monkey}
            />
          </View>

          <View
            style={{
              position: "absolute",
              width: "48.5%",
              height: Dimensions.get("window").width * 0.485,
              alignSelf: "center",
              justifyContent: "space-evenly",
              shadowColor: "black",
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.05,
              shadowRadius: 5,
              borderRadius: 150,
            }}
          >
            <View
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.75)",
                width: "60%",
                height: "60%",
                alignSelf: "center",
                justifyContent: "center",
                shadowColor: "black",
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.05,
                shadowRadius: 5,
                borderRadius: 150,
              }}
            >
              <Text
                style={[
                  styles.cardTitle,
                  {
                    marginTop: "10.5%",
                    alignSelf: "center",
                    textAlign: "center",
                    color: colors.dkPink,
                    fontFamily: fonts.semiBold,
                    paddingBottom: 15,
                    width: "90%",
                  },
                ]}
                numberOfLines={1}
                adjustsFontSizeToFit={true}
              >
                {kidName}
              </Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <NavButtons
        screen="SettingsParent"
        userId={route.params.activeUser}
        kidName={route.params.kidName}
      />
    </View>
  );
}
