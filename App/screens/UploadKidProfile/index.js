import React, { useState, useEffect } from "react";
import * as firebase from "firebase";
import * as ImagePicker from "expo-image-picker";

import {
  View,
  Button,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import styles from "../../styles"; //global styles
import style from "./style"; //local styles
import { gql, useMutation } from "@apollo/client";
import { CREATE_KID } from "../../../graphql/mutations";
import NavHome from "../../components/NavHome";
import colors from "@assets/colors";
import adjust from "../../styles/adjust";
import images from "@assets/images";
import fonts from "@assets/fonts";
import ChangeProfilePicture from "../../components/ChangeProfilePicture";

const ADD_KIDCIRCLE = gql`
  mutation AddKidCircle($type: String!) {
    addKidCircle(type: $type) {
      id
      type
    }
  }
`;

export default function UploadKidProfile({ route, navigation }) {
  const [changeProfilePicture, setChangeProfilePicture] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [picture, setPicture] = useState(null);
  console.log("picture", picture);

  const [createKid, { error }] = useMutation(CREATE_KID, {
    onError: (error) => console.log("mutation create kid", error.graphQLErrors),
    onCompleted(data) {
      console.log("completed", data);
      navigation.navigate("Recommended");
    },
  });

  const [addKidCircle, { data }] = useMutation(ADD_KIDCIRCLE);

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
    createKid({
      variables: {
        name: route.params.kidName,
        nickName: route.params.kidNickname,
        birthdate: route.params.kidDateofBirth,
        profileImageUrl: picture,
      },
    });
    navigation.navigate("Recommended");
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
      // setPicture(result.uri);
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

    setLoading(true);
    setChangeProfilePicture(false);
    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",

      function (snapshot) {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded

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
        setLoading(false);
        setPicture(uri);
        console.log("URIRUIRUIRURIR", uri);
        // Handle successful uploads on complete
        console.log("image upload success");
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          console.log("File available at", downloadURL);
          setPicture(downloadURL);
        });
      }
    );
  };

  //we need to get user's name here // they are the parent of the kid
  const nameParent = "NameOfParent";

  function hideOptions() {
    setChangeProfilePicture(false);
  }

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1, justifyContent: "space-between" }}>
      <NavHome onlyBack={true} />
      <Text
        style={[styles.title, { marginTop: 10, marginBottom: 0 }]}
        numberOfLines={1}
        adjustsFontSizeToFit={true}
      >
        Welcome <Text style={{ color: colors.dkPink }}>{nameParent}</Text> &amp;
        <Text style={{ color: colors.dkPink }}>{route.params.kidName}</Text>!
      </Text>

      <Text
        style={[
          styles.title,
          {
            fontSize: adjust(14),
            marginTop: picture ? 15 : 10,
            marginBottom: picture ? 25 : 10,
          },
        ]}
        numberOfLines={2}
        adjustsFontSizeToFit={true}
      >
        Please upload a profile picture of
        <Text style={{ color: colors.dkPink }}> {route.params.kidName} </Text>
        for your family.
      </Text>

      {/*  */}
      {loading ? (
        <ActivityIndicator
          style={{ marginBottom: picture ? "76.5%" : "129.5%" }}
          size="large"
          color="#660066"
        />
      ) : (
        <View style={{ marginBottom: picture ? "25%" : "80%" }}>
          <TouchableWithoutFeedback
            onPress={() => setChangeProfilePicture(true)}
          >
            <View
              style={
                picture
                  ? null
                  : {
                      backgroundColor: "white",
                      width: "50%",
                      alignSelf: "center",
                      justifyContent: "space-evenly",
                      shadowColor: "black",
                      shadowOffset: { width: 0, height: 0 },
                      shadowOpacity: 0.05,
                      shadowRadius: 5,
                      height: Dimensions.get("window").width * 0.5,
                      borderRadius: 100,
                    }
              }
            >
              <Image
                style={
                  picture
                    ? {
                        borderRadius: 150,
                        width: 210,
                        height: 210,
                        alignSelf: "center",
                      }
                    : styles.cardImage
                }
                source={picture ? { uri: picture } : images.monkey}
              />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => setChangeProfilePicture(true)}
          >
            <Text
              style={[
                styles.cardText,
                {
                  color: colors.dkPink,
                  fontFamily: fonts.semiBold,
                  paddingTop: 15,
                },
              ]}
            >
              Change Profile Picture
            </Text>
          </TouchableWithoutFeedback>
        </View>
      )}

      {/*  */}

      {picture && (
        <View style={[styles.loginButton, { marginBottom: "20%" }]}>
          <TouchableOpacity onPress={onSubmitHandler}>
            <Text style={styles.loginButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      )}

      {changeProfilePicture && (
        <ChangeProfilePicture
          hide={hideOptions}
          loading={loading}
          pickPhoto={pickPhoto}
        />
      )}
    </View>
  );
}
