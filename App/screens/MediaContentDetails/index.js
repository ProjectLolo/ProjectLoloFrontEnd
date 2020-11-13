import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  FlatList,
  Button,
} from "react-native";
import NavHome from "../../components/NavHome";
import MediaContentComments from "../../components/MediaContentComments";
import styles from "@styles/styles";
import colors from "@assets/colors";
import images from "@assets/colors";
import fonts from "@assets/fonts";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useQuery, useMutation } from "@apollo/client";
import { CREATE_LIKE } from "../../../graphql/mutations";
import { GET_COMMENTS_AND_LIKES } from "../../../graphql/queries";
import { useIsFocused } from "@react-navigation/native";
import CommentBox from "../../components/CommentBox";

export default function MediaContentDetails({ navigation, route }) {
  const [comments, setComments] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeLength, setLikeLength] = useState(0);
  const isFocused = useIsFocused();
  const {
    title,
    person,
    topColor,
    bottomColor,
    video,
    loveBankId,
    activeKid,
    activeUser,
  } = route.params;

  const { data, refetch } = useQuery(GET_COMMENTS_AND_LIKES, {
    variables: {
      _id: loveBankId,
      kidId: activeKid,
    },
    onCompleted(data) {
      const hasLike = data.loveBankById.likes.some(
        (item) => item.userId === activeUser
      );
      const length = data.loveBankById.likes.length;
      setLikeLength(length);
      setLiked(hasLike);
      setComments(data);
    },
  });

  const [giveLike, { data: likeData }] = useMutation(CREATE_LIKE, {
    variables: {
      loveBankId: loveBankId,
    },
    onCompleted() {
      setLiked(!liked);
    },
  });

  // Time constraints prevent me from making a subscription for the comments.
  useEffect(() => {
    refetch();
    setComments(data);
  }, [refetch, data, isFocused]);

  function handleLikeButton() {
    if (liked) {
      setLikeLength(likeLength - 1);
      giveLike();
    } else {
      setLikeLength(likeLength + 1);
      giveLike();
    }
  }

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
          <Button
            title={liked ? "Liked!" : "Like this"}
            onPress={handleLikeButton}
          />
          <Text>Likes: {likeLength}</Text>
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
              date={item.createdAt}
            />
          </TouchableWithoutFeedback>
        );
      }}
    />
  );
}
