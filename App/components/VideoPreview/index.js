import React, { useContext, useState, useEffect } from "react";
import * as firebase from "firebase";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Images from "../../assets";
import style from "../../styles";
import colors from "@assets/colors";
import { Video } from "expo-av";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useMutation } from "@apollo/client";
import { CREATE_LOVEBANK } from "../../../graphql/mutations";
import { AuthContext } from "../../context/Auth";

export default function VideoPreview({ route, navigation }) {
  const [loading, setLoading] = useState(false);
  const [loadingTime, setLoadingTime] = useState("");
  const [video, setVideo] = useState(null);
  const { activeKid } = useContext(AuthContext);

  activeKid(route.params.activeKid);
  console.log("AK", route.params.activeKid);
  // Mutation
  const [loveBankEntry, { error }] = useMutation(CREATE_LOVEBANK, {
    onError: (error) => console.log("mutation create lovebank content", error),
    onCompleted(data) {
      console.log("completed", data);
      navigation.navigate("LoveBank");
    },
  });

  console.log("video", video);

  function handleSend() {
    loveBankEntry({
      variables: {
        title: "a video",
        url: video,
        preview: route.params.uri,
        description: "this is a video",
        type: route.params.type,
        category: "share",
        kidId: route.params.activeKid,
      },
    });
  }

  // Upload Video
  useEffect(() => {
    // console.log("ASDASDADSADADASDASD", route.params.uri);
    uploadVideo(route.params.uri);
  }, [route.params.uri]);

  const uploadVideo = async (uri) => {
    setLoading(true);
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = firebase
      .storage()
      .ref()
      .child("videos/" + uri);
    const uploadTask = ref.put(blob);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      function (snapshot) {
        setLoading(true);
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setLoadingTime(Math.round(progress));
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log("Upload is paused");
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log("Upload is running");
            break;
        }
      },
      function (error) {
        // Handle unsuccessful uploads
        console.log("image upload errors:", error);
      },
      function () {
        // Handle successful uploads on complete
        console.log("image upload success");
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          console.log("File available at", downloadURL);
          setVideo(downloadURL);
          setLoading(false);
        });
      }
    );
  };
  // console.log("PREVIEW????????", route.params.uri)
  console.log("loading?", loading);
  console.log("loadingTIMEEEEEE", loadingTime);

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <Text style={[style.h2, style.center]}>
            Your {route.params.type === "video" ? "recording" : "picture"} is
            almost ready!
          </Text>
        </View>
        <View style={{ marginBottom: "75%", marginTop: "25%" }}>
          <ActivityIndicator size="large" color={colors.purple} />
          <Text style={[style.title, { marginTop: "5%" }]}>
            {loadingTime && loadingTime !== 100 && `${loadingTime} %`}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <Text style={[style.h2, style.center]}>
          Your {route.params.type === "video" ? "recording" : "picture"} is
          ready!
        </Text>
        <Text style={style.center}>
          {route.params.type === "video"
            ? "Replay your recording here!"
            : "Checkout the picture you made!"}
        </Text>
        {route.params.type === "video" ? (
          <Video
            source={{ uri: route.params.uri }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="cover"
            useNativeControls
            style={{ width: 300, height: 400 }}
          />
        ) : (
          <Image
            style={{ width: 400, height: 300 }}
            source={{
              uri: route.params.uri,
            }}
          />
        )}
      </View>

      <View>
        {/* Icons for record and upload  */}
        <View style={styles.rowContainer}>
          <TouchableOpacity onPress={() => navigation.goBack(null)}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="delete" color="#FF6E5A" size={60} />
              <Text>Start over</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSend}>
            <View style={styles.iconContainer}>
              <Image style={styles.icon} source={Images.paperPlane} />
              <Text>Save and send</Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* navigation */}
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("Recommended")}
        >
          <Text style={{ textAlign: "center", marginTop: 50 }}>
            Press here to go to Recommended
          </Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 40,
    paddingRight: 40,
  },
  icon: {
    width: 60,
    height: 60,
  },
  image: {
    width: 240,
    height: 240,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  mainContainer: {
    width: 300,
    flexDirection: "column",
    alignItems: "center",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
