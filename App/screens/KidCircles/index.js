import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  FlatList,
  Dimensions,
} from "react-native";

import { useQuery } from "@apollo/client";

import styles from "@styles/styles"; //have to changeit to @styles/styles
import images from "@assets/images";
import NavButtons from "../../components/NavButtons";
import KidCircleCard from "../../components/KidCircleCard";
import colors from "@assets/colors";
import fonts from "@assets/fonts";
import adjust from "../../styles/adjust";

import { GET_ALL_KIDS } from "../../../graphql/queries";
import { useIsFocused } from "@react-navigation/native";

export default function KidCircles({ route, navigation }) {
  const isFocused = useIsFocused();
  const [fetchedData, setFetchedData] = useState(data);
  const { data, refetch } = useQuery(GET_ALL_KIDS, {
    variables: {
      userId: route.params.activeUser,
    },
  });

  const userName = route.params.firstName;

  console.log("dataaaaaaaaaaaaalenggth", !data.findAllKids.length);
  useEffect(() => {
    console.log("refetch", refetch);
    console.log("fetchedData", fetchedData);
    refetch();
    setFetchedData(data);
  }, [refetch, data, isFocused]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-evenly",
      }}
    >
      <Image
        style={[styles.peekabondLogo, { marginBottom: -120, width: "30%" }]}
        source={images.peekabondLogo}
      />
      <Text
        style={[
          styles.title,
          {
            marginTop: data && data.findAllKids.length === 0 ? "40%" : "20%",
            marginBottom: data && data.findAllKids.length === 0 ? "10%" : "5%",
          },
        ]}
        adjustsFontSizeToFit={true}
        numberOfLines={1}
      >
        Welcome{data && !data.findAllKids.length === 0 && ` back,`} {userName} !
      </Text>

      {data && data.findAllKids.length === 0 && (
        <Text
          style={[styles.title, { marginTop: "10%", marginBottom: "10%" }]}
          adjustsFontSizeToFit={true}
          numberOfLines={1}
        >
          Please <Text style={{ color: colors.dkTeal }}>Join</Text> or
          <Text style={{ color: colors.dkPink }}> Create</Text> your first
          circle!
        </Text>
      )}

      <FlatList
        contentContainerStyle={{
          alignSelf: "center",
          width: "90%",
          paddingTop: 30,
        }}
        data={fetchedData && fetchedData.findAllKids}
        numColumns={1}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return (
            <TouchableWithoutFeedback>
              <KidCircleCard
                id={item._id}
                kidImage={item.profileImageUrl}
                kidName={item.name}
              />
            </TouchableWithoutFeedback>
          );
        }}
        ListFooterComponent={
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <View
              style={{
                width: "25%",
                height: Dimensions.get("window").width * 0.225,
                marginHorizontal: "10%",
                marginBottom: 150,
              }}
            >
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate("JoinKidCircle")}
              >
                <View>
                  <Text
                    style={[
                      styles.cardText,
                      {
                        color: colors.dkTeal,
                        fontFamily: fonts.semiBold,
                      },
                    ]}
                  >
                    Join Circle
                  </Text>
                  <Text
                    style={[
                      styles.cardText,
                      {
                        color: colors.purple,
                        fontFamily: fonts.semiBold,
                        paddingBottom: 15,

                        fontSize: adjust(10),
                      },
                    ]}
                  >
                    (Access Code)
                  </Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate("JoinKidCircle")}
              >
                <View
                  style={{
                    backgroundColor: "white",
                    width: "100%",
                    height: "100%",
                    alignSelf: "center",
                    justifyContent: "space-evenly",
                    shadowColor: "black",
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.05,
                    shadowRadius: 5,
                    borderRadius: 100,
                  }}
                >
                  <Text
                    style={[
                      styles.cardText,
                      {
                        color: colors.purple,
                        fontFamily: fonts.bold,
                        fontSize: adjust(50),
                      },
                    ]}
                  >
                    #
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
            <View
              style={{
                width: "25%",
                height: Dimensions.get("window").width * 0.225,
                marginHorizontal: "10%",
              }}
            >
              <TouchableWithoutFeedback
                onPress={() =>
                  navigation.navigate("CreateKidCircle", { userName })
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
                  Create New Circle
                </Text>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() =>
                  navigation.navigate("CreateKidCircle", { userName })
                }
              >
                <View
                  style={{
                    backgroundColor: "white",
                    width: "100%",
                    height: "100%",
                    alignSelf: "center",
                    justifyContent: "space-evenly",
                    shadowColor: "black",
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.05,
                    shadowRadius: 5,
                    borderRadius: 100,
                  }}
                >
                  <View
                    style={{
                      alignSelf: "center",
                      width: "50%",
                      backgroundColor: colors.purple,
                      height: "10%",
                      borderRadius: 25,
                    }}
                  ></View>
                  <View
                    style={{
                      top: "25%",
                      alignSelf: "center",
                      position: "absolute",
                      width: "10%",
                      backgroundColor: colors.purple,
                      height: "50%",
                      borderRadius: 25,
                    }}
                  ></View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        }
      />

      <View style={{ marginTop: "5%" }}>
        <NavButtons screen="Single" />
      </View>
    </View>
  );
}
