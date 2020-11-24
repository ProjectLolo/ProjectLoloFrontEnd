import React, { useState, useEffect } from "react";
import * as firebase from "firebase";
import {
  View,
  Alert,
  Text,
  TouchableWithoutFeedback,
  Image,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedbackBase,
} from "react-native";
import { Video } from "expo-av";
import NavHome from "../../components/NavHome";
import { useNavigation } from "@react-navigation/native";
import MediaContentComments from "../../components/MediaContentComments";
import EnlargeVideo from "../../components/EnlargeVideo";
import styles from "@styles/styles";
import adjust from "../../styles/adjust";
import images from "@assets/colors";
import fonts from "@assets/fonts";
import colors from "@assets/colors";
import { useQuery, useMutation } from "@apollo/client";
import { CREATE_LIKE, DELETE_LOVEBANK } from "../../../graphql/mutations";
import { GET_COMMENTS_AND_LIKES } from "../../../graphql/queries";
import { useIsFocused } from "@react-navigation/native";
import CommentBox from "../../components/CommentBox";

export default function MediaContentDetails({ navigation, route }) {
  const [comments, setComments] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeLength, setLikeLength] = useState(0);
  const [startVideo, setStartVideo] = useState(false);
  const isFocused = useIsFocused();
  const {
    backCol,
    firstName,
    titleVid,
    loveBankId,
    preview,
    person,
    video,
    activeKid,
    activeUser,
    recImage,
    likes,
  } = route.params;

  const Navigation = useNavigation();
  const { goBack } = Navigation;

  console.log(route.params);

  const { data, refetch } = useQuery(GET_COMMENTS_AND_LIKES, {
    variables: {
      _id: loveBankId,
      kidId: activeKid,
    },
    onCompleted(data) {
      const hasLike = data.loveBankById.likes.some(
        (item) => item.userId.userId === activeUser
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

  const [deleteLovebank, { data: deletedData }] = useMutation(DELETE_LOVEBANK, {
    variables: {
      loveBankId: loveBankId,
    },
    onError(error) {
      console.log("error", error.graphQLErrors);
    },
    onCompleted() {
      const videoRef = firebase
        .storage()
        .ref()
        .child("videos/" + preview);
      videoRef
        .delete()
        .then(() => {
          console.log("The content has been deleted successfully.");
          goBack();
        })
        .catch((e) => console.log("Error on content deletion => ", e));
    },
  });

  console.log("liked", liked);

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

  function handleDeleteButton() {
    Alert.alert(
      "Are you sure?",
      "This cannot be undone",
      [
        {
          text: "Confirm",
          onPress: () => deleteLovebank(loveBankId),
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  }

  if (!comments) {
    return (
      <View>
        <Text>...No comments, please fix me</Text>
      </View>
    );
  }

  console.log("startVideo", startVideo);
  function hideOptions() {
    setStartVideo(false);
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ListHeaderComponent={
          <>
            <NavHome />
            <View
              style={{
                backgroundColor: colors.black,
                alignSelf: "center",
                justifyContent: "flex-start",
                borderRadius: 20,
                width: "90%",
                height: 220,
                marginBottom: "8.5%",
              }}
            >
              <TouchableWithoutFeedback onPress={() => setStartVideo(true)}>
                <Image
                  style={[
                    {
                      resizeMode: "contain",
                      alignSelf: "center",
                      width: "100%",
                      height: 192,
                    },
                  ]}
                  source={{ uri: preview }}
                />
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback onPress={handleLikeButton}>
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
                    {likeLength}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>

            {activeUser == person && (
              <View>
                <TouchableWithoutFeedback onPress={handleDeleteButton}>
                  <Text
                    style={[
                      {
                        width: "100%",
                        color: "black",
                        fontFamily: fonts.bold,
                        textAlign: "center",
                        fontSize: adjust(16),
                      },
                    ]}
                    adjustsFontSizeToFit={true}
                    numberOfLines={2}
                  >
                    Delete
                  </Text>
                </TouchableWithoutFeedback>
              </View>
            )}

            <CommentBox
              loveBankId={loveBankId}
              refetch={refetch}
              firstName={firstName}
            />
          </>
        }
        contentContainerStyle={{
          marginHorizontal: 10,
        }}
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
      {startVideo && <EnlargeVideo video={video} hide={hideOptions} />}
    </View>
  );
}
const style = StyleSheet.create({
  heart: {
    height: 20,
    width: 20,
    alignSelf: "center",
  },
});
