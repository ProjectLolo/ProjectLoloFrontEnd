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
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import styles from "../../styles"; //global styles
import { useMutation } from "@apollo/client";
import NavHome from "../../components/NavHome";
import colors from "@assets/colors";
import adjust from "../../styles/adjust";
import images from "@assets/images";
import fonts from "@assets/fonts";
import ChangeProfilePicture from "../../components/ChangeProfilePicture";
import { ADD_USER_PROFILE_IMAGE } from "../../../graphql/mutations";
import { AuthContext } from "../../context/Auth";

export default function UploadUserProfile({ route, navigation }) {
  const [changeProfilePicture, setChangeProfilePicture] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [picture, setPicture] = useState(null);
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useContext(AuthContext);

  const [addUserProfileImage, { error }] = useMutation(ADD_USER_PROFILE_IMAGE, {
    onError: (error) =>
      console.log("mutation upload user profileImage ", error.graphQLErrors),

    onCompleted(data) {
      console.log(route.params.data.token);

      if (route.params.data.token) {
        //Does this work?
        signIn(route.params.data.token);
        navigation.navigate("KidCircles");
      }
    },
  });

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
    addUserProfileImage({
      variables: {
        id: route.params.data.id,
        imageUrl: picture,
      },
    });
  }

  function hideOptions() {
    setChangeProfilePicture(false);
  }

  const handleSkip = () => {
    if (route.params.data.token) {
      //Does this work?
      signIn(route.params.data.token);
    }
  };

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
      setChangeProfilePicture(false);
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
    <View style={{ flex: 1, justifyContent: "space-between" }}>
      <NavHome onlyBack={true} />
      <Text
        style={[styles.title, { marginTop: 10, marginBottom: 0 }]}
        numberOfLines={1}
        adjustsFontSizeToFit={true}
      >
        Welcome {route.params.data.firstName} !
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
        numberOfLines={4}
        adjustsFontSizeToFit={true}
      >
        Almost ready to play &amp; bond.
        <Text style={{ color: colors.dkPink }}></Text>
        {"\n"} Let's start with a clear profile picture so the kids can learn
        how to {"\n"}recognize your face.
      </Text>

      {loading ? (
        <ActivityIndicator
          style={{ marginBottom: "76.5%" }}
          size="large"
          color="#660066"
        />
      ) : (
        <View style={{ marginBottom: "15%" }}>
          <TouchableWithoutFeedback
            onPress={() => setChangeProfilePicture(true)}
          >
            <View
              style={{
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
              }}
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

      {picture ? (
        <View style={[styles.loginButton, { marginBottom: "20%" }]}>
          <TouchableOpacity onPress={onSubmitHandler}>
            <Text style={styles.loginButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={[styles.loginButton, { marginBottom: "20%" }]}>
          <TouchableOpacity onPress={handleSkip}>
            <Text style={styles.loginButtonText}>Skip for now</Text>
          </TouchableOpacity>
        </View>
      )}

      {changeProfilePicture && (
        <ChangeProfilePicture
          hide={hideOptions}
          loading={loading}
          pickPhoto={pickPhoto}
          nav="UploadKidProfile"
        />
      )}
    </View>
  );
}
