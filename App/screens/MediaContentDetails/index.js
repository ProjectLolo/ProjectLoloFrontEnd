import React, { useState, useEffect } from "react";
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
  const [comments, setComments] = useState(false);
  const {
    title,
    person,
    topColor,
    bottomColor,
    video,
    loveBankId,
    activeKid,
  } = route.params;

  const { data, refetch } = useQuery(GET_COMMENTS_AND_LIKES, {
    variables: {
      _id: loveBankId,
      kidId: activeKid,
    },
  });

  useEffect(() => {
    refetch();
    setComments(data);
  }, [refetch, data]);

  // useEffect(() => {
  //   console.log("do i get here");

  // }, []);

  // need to integrate comments and likes. Hardcoded Id and kidId in the query, replace withloveBankId and activeKid
  // Kept this hardcoded because of no data in this user account in comments/likes
  console.log("data in mediaContent", comments);
  console.log("lovebankid activekid", loveBankId, activeKid);
  console.log("length", comments);
  // const cardContent = [
  //   {
  //     id: 1,
  //     person: "mom",
  //     text: "Love this video!",
  //     video: null,
  //   },
  //   {
  //     id: 2,
  //     person: "auntie Annie",
  //     text:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  //     video: null,
  //   },
  //   {
  //     id: 3,
  //     person: "cousin Jan",
  //     text: null,
  //     video: images.videoCameraPurple,
  //   },
  // ];
  if (!comments) {
    return (
      <View>
        <Text>...No comments, please fix me</Text>
      </View>
    );
  }
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
          <CommentBox loveBankId={loveBankId} refetch={refetch} />
        </>
      }
      contentContainerStyle={{ marginHorizontal: 10 }}
      data={comments.loveBankById.comments}
      numColumns={1}
      keyExtractor={(item) => item._id.toString()}
      renderItem={({ item }) => {
        return (
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("MediaContentDetails")}
          >
            <MediaContentComments
              person={item.firstName}
              text={item.comment}
              video={item.video}
            />
          </TouchableWithoutFeedback>
        );
      }}
    />
  );
}
