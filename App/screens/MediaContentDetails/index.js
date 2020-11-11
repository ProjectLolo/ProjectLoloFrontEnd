import React from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  FlatList,
} from "react-native";
import NavHome from "../../components/NavHome";
import MediaContentComments from "../../components/MediaContentComments";
import styles from "@styles/styles";
import colors from "@assets/colors";
import images from "@assets/colors";
import fonts from "@assets/fonts";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useQuery } from "@apollo/client";

import { GET_COMMENTS_AND_LIKES } from "../../../graphql/queries";

import CommentBox from "../../components/CommentBox";

export default function MediaContentDetails({ navigation, route }) {
  const {
    title,
    person,
    topColor,
    bottomColor,
    video,
    loveBankId,
  } = route.params;

  const { data } = useQuery(GET_COMMENTS_AND_LIKES, {
    variables: {
      id: loveBankId,
      kidId: route.params.activeKid,
    },
  });

  console.log("data in mediaContent", data);
  const cardContent = [
    {
      id: 1,
      person: "mom",
      text: "Love this video!",
      video: null,
    },
    {
      id: 2,
      person: "auntie Annie",
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      video: null,
    },
    {
      id: 3,
      person: "cousin Jan",
      text: null,
      video: images.videoCameraPurple,
    },
  ];

  return (
    <FlatList
      ListHeaderComponent={
        <>
          <NavHome />
          <View
            style={[
              styles.cardContainer,
              { marginTop: 0, marginBottom: 10, marginHorizontal: 0 },
            ]}
          >
            <View
              style={{
                backgroundColor: colors[topColor],
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                height: 35,
                justifyContent: "center",
              }}
            >
              <Text
                style={[styles.cardTitle, { paddingHorizontal: 5 }]}
                adjustsFontSizeToFit={true}
                numberOfLines={1}
              >
                {title} by {person}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: colors[bottomColor],
                justifyContent: "center",
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                padding: 50,
              }}
            >
              <Image style={styles.cardImage} source={video} />
            </View>
          </View>
          <CommentBox />
        </>
      }
      contentContainerStyle={{ marginHorizontal: 10 }}
      data={cardContent}
      numColumns={1}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => {
        return (
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("MediaContentDetails")}
          >
            <MediaContentComments
              person={item.person}
              text={item.text}
              video={item.video}
            />
          </TouchableWithoutFeedback>
        );
      }}
    />
  );
}
