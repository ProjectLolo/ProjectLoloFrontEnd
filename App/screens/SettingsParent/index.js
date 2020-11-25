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
  const [parent, setParent] = useState(false);
  const [kid, setKid] = useState(false);
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

    if (data && query2) {
      const kid = data.findAllKids.find((kid) => {
        if (kid.name === route.params.kidName) {
          return true;
        }
      });
      setKidImage(kid.profileImageUrl);
      setKidName(kid.name);

      setParentImage(
        query2.client.cache.data.data[`User:${route.params.activeUser}`]
          .profilePic
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
      <Text style={[styles.title, { marginTop: 0 }]}>
        Please choose the settings you want to go to:
      </Text>
      <TouchableWithoutFeedback
        onPressIn={() => {
          setParent(true);
        }}
        onPressOut={() => {
          setParent(false);
        }}
        onPress={() => navigation.navigate("Settings")}
      >
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View
            style={{
              backgroundColor: "white",
              width: "48%",
              height: Dimensions.get("window").width * 0.48,
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
                resizeMode: !parentImage ? "contain" : "",
                width: parentImage ? 200 : "90%",
                height: parentImage ? 200 : "100%",
                alignSelf: "center",
              }}
              source={parentImage ? { uri: parentImage } : images.monkey}
            />
          </View>
          {parent && (
            <View
              style={{
                position: "absolute",
                backgroundColor: "rgba(255, 255, 255, 0.6)",
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
                {parentName}
              </Text>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPressIn={() => {
          setKid(true);
        }}
        onPressOut={() => {
          setKid(false);
        }}
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
                resizeMode: !kidImage ? "contain" : "",
                width: kidImage ? 200 : "90%",
                height: kidImage ? 200 : "100%",
                alignSelf: "center",
              }}
              source={kidImage ? kidImage : images.monkey}
            />
          </View>
          {kid && (
            <View
              style={{
                position: "absolute",
                backgroundColor: "rgba(255, 255, 255, 0.6)",
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
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
      <NavButtons />
    </View>
  );
}
