import React, { useState, useEffect } from "react";
import * as firebase from "firebase";
import * as ImagePicker from "expo-image-picker";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  ScrollView,
  Dimensions,
  Image,
  ActivityIndicator,
} from "react-native";
import NavHome from "../../components/NavHome";
import NavButtons from "../../components/NavButtons";
import ChangeProfilePicture from "../../components/ChangeProfilePicture";

import { useQuery } from "@apollo/client";
import { GET_ALL_KIDS } from "../../../graphql/queries";
import { useIsFocused } from "@react-navigation/native";

import adjust from "../../styles/adjust";
import styles from "@styles/styles";
import images from "@assets/images";
import colors from "@assets/colors";
import fonts from "@assets/fonts";

export default function SettingsKid({ route, navigation }) {
  const [kidInfo, setKidInfo] = useState({
    birthdate: "",
    name: "",
    nickName: "",
    profilePic: "",
  });
  const [changeProfilePicture, setChangeProfilePicture] = useState(false);
  const [changeInfo, setChangeInfo] = useState(false);
  const [message, setMessage] = useState({ text: "", color: "" });
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();
  console.log("what is in route.params", route.params);
  const { result } = route.params;
  console.log("result", result);

  useEffect(() => {
    if (result && result.uri) {
      uploadImage(result.uri, `Image_${route.params.activeKid}`);
    }
  }, [result]);

  const { data, refetch, loading: dataLoading } = useQuery(GET_ALL_KIDS, {
    variables: {
      userId: route.params.activeUser,
    },
    onCompleted(fetchedData) {},
  });
  console.log(kidInfo);

  console.log("data", data);
  useEffect(() => {
    data &&
      data.findAllKids.find((kid) => {
        if (kid._id === route.params.activeKid) {
          setKidInfo({
            ...kidInfo,
            birthdate: kid.birthdate,
            name: kid.name,
            nickName: kid.nickName,
            profilePic: kid.profileImageUrl,
          });
        }
      });
  }, [data, refetch, isFocused]);

  //   const [submitKidSettings, { error }] = useMutation(SETTINGS, {
  //     onError: (error) => {
  //       console.log("SETTINGS ERROR: ", error.graphQLErrors[0].message);
  //       if (error.graphQLErrors[0].message === "Please fill the form") {
  //         setMessage({
  //           text: "To submit changes, please add password",
  //           color: "orange",
  //         });
  //       }
  //     },
  //     onCompleted(data) {
  //       console.log("data", data);
  //       setChangeInfo(false);
  //       setMessage({ text: "SUCCESS!!!", color: "teal" });
  //       setVariables({ ...variables, password: "", passwordControl: "" });
  //     },
  //   });

  function submitForm(e) {
    e.preventDefault();
    // submitKidSettings({ kidInfo });
    //This mutation needs to be made still.
  }

  function hideOptions() {
    setChangeProfilePicture(false);
  }

  function showMessage() {
    if (message.text !== "" && message.color !== "") {
      setTimeout(() => {
        setMessage({ text: "", color: "" });
      }, 2000);
      return (
        <View style={{ marginBottom: "5%", marginTop: "-5%" }}>
          <Text
            style={[
              styles.cardText,
              {
                color: colors[message.color],
                fontFamily: fonts.semiBold,
                paddingVertical: 15,
              },
            ]}
          >
            {message.text}
          </Text>
        </View>
      );
    }
  }

  //Choose picture from device
  const pickPhoto = async () => {
    setChangeProfilePicture(false);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.3,
    });

    console.log("result", result);

    if (!result.cancelled) {
      console.log("pickPhoto result.uri", result);
      uploadImage(result.uri, `Image_${route.params.activeKid}`);
    }
  };

  //upload image to firebase
  const uploadImage = async (uri, imageName) => {
    setLoading(true);
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = firebase
      .storage()
      .ref()
      .child("kidProfileImages/" + imageName);
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
        console.log("URIRUIRUIRURIR", uri);
        // Handle successful uploads on complete
        console.log("image upload success");
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          console.log("File available at", downloadURL);
          setKidInfo({ ...kidInfo, profilePic: downloadURL });
          setLoading(false);
        });
      }
    );
  };

  return (
    <View style={{ flex: 1, justifyContent: "space-between" }}>
      <NavHome />

      <ScrollView>
        <TouchableWithoutFeedback
          onPress={() => {
            setChangeProfilePicture(true);
            setChangeInfo(true);
          }}
        >
          {loading ? (
            <ActivityIndicator
              style={{ marginBottom: "76.5%" }}
              size="large"
              color="#660066"
            />
          ) : (
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
                marginTop: "5%",
              }}
            >
              <Image
                style={
                  kidInfo.profilePic
                    ? {
                        borderRadius: 150,
                        width: 210,
                        height: 210,
                        alignSelf: "center",
                      }
                    : styles.cardImage
                }
                source={
                  kidInfo.profilePic
                    ? { uri: kidInfo.profilePic }
                    : images.monkey
                }
              />
            </View>
          )}
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            setChangeProfilePicture(true);
            setChangeInfo(true);
          }}
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

        <View>
          <Text
            style={[styles.inputLabel, { color: colors.purple, marginTop: 20 }]}
          >
            Full Name
          </Text>
          <View
            style={{
              alignSelf: "center",
              width: "90%",
              height: 60,
            }}
          >
            <Text
              style={{
                fontFamily: fonts.regular,
                color: colors.black,
                alignSelf: "flex-start",
                height: 60,
                fontSize: adjust(16),
                paddingTop: 10,
              }}
              adjustsFontSizeToFit={true}
              numberOfLines={1}
            >
              {kidInfo.name}
            </Text>
          </View>
          <Text
            style={[styles.inputLabel, { color: colors.purple, paddingTop: 0 }]}
          >
            Birthday
          </Text>
          <View
            style={{
              alignSelf: "center",
              width: "90%",
              height: 60,
            }}
          >
            <Text
              style={{
                fontFamily: fonts.regular,
                color: colors.black,
                alignSelf: "flex-start",
                height: 60,
                fontSize: adjust(16),
                paddingTop: 10,
              }}
              adjustsFontSizeToFit={true}
              numberOfLines={1}
            >
              {`${kidInfo.birthdate.split("T")[0].split("-")[2]} - ${
                kidInfo.birthdate.split("T")[0].split("-")[1]
              } - ${kidInfo.birthdate.split("T")[0].split("-")[0]} `}
            </Text>
          </View>
        </View>
      </ScrollView>

      {changeProfilePicture && (
        <ChangeProfilePicture
          hide={hideOptions}
          nav="SettingsKid"
          pickPhoto={pickPhoto}
        />
      )}

      <NavButtons />
    </View>
  );
}
