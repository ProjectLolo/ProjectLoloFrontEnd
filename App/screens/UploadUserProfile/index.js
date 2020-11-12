import React, { useState, useEffect, useContext } from "react";
import * as firebase from "firebase";
import * as ImagePicker from "expo-image-picker";

import {
  View,
  Button,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import styles from "../../styles"; //global styles
import style from "./style"; //local styles

export default function UploadUserProfile({ route, navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [picture, setPicture] = useState(
    "https://www.kindpng.com/picc/m/33-332538_boy-icon-01-01-cartoon-hd-png-download.png"
  );
  const [loading, setLoading] = useState(false);

  // TODO: mutation to change/upload profile picture

  //TODO: add this part into a component and do the same for in UploadKidProfile

  // asks permission from used to use camera
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();

        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        } else setHasPermission(status === "granted");
      }
    })();
  }, []);

  function onSubmitHandler() {
    // changeProfilePic({
    //   variables: {
    //     profilePic: picture,
    //   },
    // });
  }
  //using camera
  useEffect(() => {
    const result = route.params.result;
    if (route.params.result) {
      uploadImage(result.uri, "profile");
    }
  }, [route.params]);

  //Choose picture from device
  const pickPhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      console.log("pickPhoto result.uri", result);
      uploadImage(result.uri, "profile");
      setPicture(result.uri);
    }
  };

  //upload image to firebase
  const uploadImage = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = firebase
      .storage()
      .ref()
      .child("images/" + imageName);
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
          setPicture(downloadURL);
          setLoading(false);
        });
      }
    );
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={[styles.fontFamily]}>
      <View>
        <Text
          style={[style.text, style.align]}
        >{`Welcome ${route.params.firstName}! Almost ready to play & bond :-)`}</Text>
        {loading && <ActivityIndicator size="large" color="#660066" />}
      </View>
      <View>
        <Text style={[style.label, style.align, style.spacing]}>
          {`Let's start with a clear profile picture so [kid] can learn to recognize your face.`}
        </Text>
      </View>

      <View style={[{ flexDirection: "row" }]}>
        <View>
          {picture && (
            <Image
              source={{ uri: picture }}
              alt="no-picture"
              style={[style.image]}
            />
          )}
        </View>
        <View style={[style.spacing, { alignSelf: "center" }]}>
          <Button title="Pick a photo" onPress={pickPhoto} />
          <Button
            title="Take Picture"
            onPress={() => navigation.navigate("TakeProfilePicture")}
          />
        </View>
      </View>

      <View style={[{ flexDirection: "row" }, style.spacing]}>
        <View style={[style.button, styles.yellow]}>
          <TouchableOpacity onPress={() => navigation.navigate("KidCircles")}>
            <Text style={style.button}>Skip this</Text>
          </TouchableOpacity>
        </View>
        <View style={[style.button, styles.dkPink]}>
          <TouchableOpacity onPress={onSubmitHandler}>
            <Text style={style.button}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}