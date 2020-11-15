import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  FlatList,
  Button,
  StyleSheet,
} from "react-native";
import NavHome from "../../components/NavHome";
import MediaContentComments from "../../components/MediaContentComments";
import styles from "@styles/styles";
import colors from "@assets/colors";
import adjust from "../../styles/adjust";
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
    backCol,
    firstName,
    titleVid,
    loveBankId,
    preview,
    video,
    activeKid,
    activeUser,
    recImage,
    likes,
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
            style={{
              backgroundColor: backCol,
              width: 170,
              height: 225,
              alignSelf: "center",
              justifyContent: "flex-start",
              borderRadius: 20,
              // marginBottom: sizeImage.width > sizeImage.height ? "25%" : 0,
              // padding: 5,
            }}
          >
            <Image
              style={[
                {
                  resizeMode: "contain",
                  alignSelf: "center",
                  width: 170,
                  height: 192,
                },
              ]}
              source={{ uri: preview }}
            />

            <View
              style={{
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                width: "100%",
                height: "15%",
                justifyContent: "center",
                flexDirection: "row",
              }}
            >
              <Image
                style={{
                  width: "100%",
                  height: "100%",
                  borderBottomLeftRadius: 20,
                  borderBottomRightRadius: 20,
                  position: "absolute",
                }}
                source={recImage}
              />
              <View
                style={{
                  width: "60%",
                  marginRight: "5%",
                  marginLeft: "10%",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={[
                    {
                      width: "100%",
                      color: "white",
                      fontFamily: fonts.bold,
                      textAlign: "center",
                      fontSize: adjust(16),
                    },
                  ]}
                  adjustsFontSizeToFit={true}
                  numberOfLines={2}
                >
                  {titleVid} by {firstName}
                </Text>
              </View>
              <Image source={images.star} style={style.heart} />
              <Text
                style={[
                  styles.cardTitle,
                  {
                    marginLeft: "5%",
                    marginRight: "10%",
                  },
                ]}
              >
                {likes}
              </Text>
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
const style = StyleSheet.create({
  heart: {
    height: 20,
    width: 20,
    alignSelf: "center",
  },
});
