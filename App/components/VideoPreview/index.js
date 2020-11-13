import React, { useContext, useState, useEffect } from "react";
import * as firebase from "firebase";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  StyleSheet,
} from "react-native";
import Images from "../../assets";
import style from "../../styles";
import { Video } from "expo-av";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useMutation } from "@apollo/client";
import { CREATE_LOVEBANK} from "../../../graphql/mutations"
import { AuthContext } from "../../context/Auth";

export default function VideoPreview({ route, navigation, }) {
 

  const [loading, setLoading] = useState(false);
  const [video, setVideo] = useState(null);
  const { activeKid } = useContext(AuthContext);


  activeKid(route.params.activeKid)
  console.log("AK", route.params)
  // Mutation
  const [loveBankEntry, { error }] = useMutation(CREATE_LOVEBANK, {
    onError: (error) => console.log("mutation create lovebank content", error.graphQLErrors),
    onCompleted(data) {
      console.log("completed", data);

    },
  });

  function handleSend() {
    loveBankEntry({
      variables: {
        title: "a video",
        url: video,
        preview: route.params.uri,
        description: "this is a video",
        type:"video",
        category: "share",
        kidId: route.params.activeKid,

      },
    });   
    navigation.navigate("MessageSent", { uri: route.params.uri})
  }
  console.log("Kid", route.params.activeKid)
  // Upload Video
  useEffect(() => {
    uploadVideo(route.params.uri)
  }, [route.params.uri]);

  const uploadVideo = async (uri) => {
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
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        setLoading(true);
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
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
          setVideo(downloadURL)
          setLoading(false)

        });
      }
    );
  };

 

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <Text style={[style.h2, style.center]}>Your recording is ready!</Text>
        <Text style={style.center}>Replay your recording here</Text>
        <Video
          source={{ uri: route.params.uri }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          useNativeControls
          style={{ width: 300, height: 300 }}
        />
      </View>
      {/* Icons for record and upload */}
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
