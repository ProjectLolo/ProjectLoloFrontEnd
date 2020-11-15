import React, { useState, useContext, useEffect } from "react";
import * as firebase from "firebase";
import * as ImagePicker from "expo-image-picker";
import { AuthContext } from "../../context/Auth";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import NavHome from "../../components/NavHome";
import NavButtons from "../../components/NavButtons";
import images from "@assets/images";
import styles from "@styles/styles";
import ChangeProfilePicture from "../../components/ChangeProfilePicture";
import colors from "@assets/colors";
import fonts from "@assets/fonts";
import adjust from "../../styles/adjust";

import { useMutation, useQuery } from "@apollo/client";
import { SETTINGS } from "../../../graphql/mutations";
import { FIND_USER_BY_ID } from "../../../graphql/queries";
import { useIsFocused } from "@react-navigation/native";

export default function Settings({ route, navigation }) {
  const isFocused = useIsFocused();
  const single = route.params;
  const { result } = route.params;
  const { signOut } = useContext(AuthContext);

  console.log("WHAT IS IN RESULT?", result);
  console.log("WHAT IS IN ROUTE PARAMS", route.params);

  const [variables, setVariables] = useState({
    firstName: "",
    lastName: "",
    nickName: "",
    email: "",
    password: "",
    passwordControl: "",
    profilePic: "",
  });

  const [changeProfilePicture, setChangeProfilePicture] = useState(false);
  const [changeInfo, setChangeInfo] = useState(false);
  const [message, setMessage] = useState({ text: "", color: "" });
  const [loading, setLoading] = useState(false);

  const { data, refetch } = useQuery(FIND_USER_BY_ID, {
    variables: {
      id: route.params.activeUser,
    },
  });
  console.log("WHAT IS IN THE DATA", data);
  useEffect(() => {
    refetch();
    setVariables({
      firstName: data && data.findUserById.firstName,
      lastName: data && data.findUserById.lastName,
      nickName: "",
      email: data && data.findUserById.email,
      profilePic: data && data.findUserById.profilePic,
      password: "",
      passwordControl: "",
    });
  }, [data, isFocused]);

  useEffect(() => {
    if (result && result.uri) {
      uploadImage(result.uri, `Image_${route.params.activeUser}`);
    }
  }, [result]);

  // console.log("variables", variables);

  const [submitSettings, { error }] = useMutation(SETTINGS, {
    onError: (error) => {
      console.log("SETTINGS ERROR: ", error.graphQLErrors[0].message);
      if (error.graphQLErrors[0].message === "Please fill the form") {
        setMessage({
          text: "To submit changes, please add password",
          color: "orange",
        });
      }
    },
    onCompleted(data) {
      setChangeInfo(false);
      // setVariables(...variables, {password: "", passwordControl: ""})
      setMessage({ text: "SUCCESS!!!", color: "teal" });
      setVariables({ ...variables, password: "", passwordControl: "" });
      console.log("SUCCESSFULLY UPDATED INFO", data);
    },
  });

  console.log("VARIABLES", variables);
  function submitForm(e) {
    e.preventDefault();
    // setPhoto(route.params.result);
    submitSettings({ variables });
    // console.log("photo", photo);
    // photo ? photo : setVariables.profilePic;
    // setVariables({ ...variables, profilePic: photo });
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
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      console.log("pickPhoto result.uri", result);
      uploadImage(result.uri, `Image_${route.params.activeUser}`);
      // setPicture(result.uri);
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
      .child("userProfileImages/" + imageName);
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
          setVariables({ ...variables, profilePic: downloadURL });
          setLoading(false);
        });
      }
    );
  };

  console.log("loading?", loading);
  return (
    <View style={{ flex: 1, justifyContent: "space-evenly" }}>
      <NavHome />

      <ScrollView>
        <TouchableWithoutFeedback onPress={() => setChangeProfilePicture(true)}>
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
              }}
            >
              <Image
                style={
                  variables.profilePic
                    ? {
                        borderRadius: 150,
                        width: 210,
                        height: 210,
                        alignSelf: "center",
                      }
                    : styles.cardImage
                }
                source={
                  variables.profilePic
                    ? { uri: variables.profilePic }
                    : images.monkey
                }
              />
            </View>
          )}
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => setChangeProfilePicture(true)}>
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

        {!changeInfo ? (
          <View>
            <Text
              style={[
                styles.inputLabel,
                { color: colors.purple, marginTop: 20 },
              ]}
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
                {`${variables.firstName} ${variables.lastName}`}
              </Text>
            </View>
            {/* <Text
              style={[
                styles.inputLabel,
                { color: colors.purple, paddingTop: 0 },
              ]}
            >
              Nickname
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
                {variables.nickName ? variables.nickName : "-"}
              </Text>
            </View> */}
            <Text
              style={[
                styles.inputLabel,
                { color: colors.purple, paddingTop: 0 },
              ]}
            >
              Email
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
                {variables.email}
              </Text>
            </View>
            <TouchableWithoutFeedback onPress={() => setChangeInfo(true)}>
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
                Change information
              </Text>
            </TouchableWithoutFeedback>
          </View>
        ) : (
          <View>
            <Text style={[styles.inputLabel, { color: colors.purple }]}>
              First name
            </Text>
            <TextInput
              style={[styles.inputBox, { backgroundColor: colors.white }]}
              placeholder={"Enter first name..."}
              placeholderTextColor="grey"
              onChangeText={(text) =>
                setVariables({ ...variables, firstName: text })
              }
              value={variables.firstName}
            />
            <Text style={[styles.inputLabel, { color: colors.purple }]}>
              Last name
            </Text>
            <TextInput
              style={[styles.inputBox, { backgroundColor: colors.white }]}
              placeholder="Enter last name..."
              placeholderTextColor="grey"
              onChangeText={(text) =>
                setVariables({ ...variables, lastName: text })
              }
              value={variables.lastName}
            />
            {/* <Text style={[styles.inputLabel, { color: colors.purple }]}>
              Nickname
            </Text>
            <TextInput
              style={[styles.inputBox, { backgroundColor: colors.white }]}
              placeholder="Enter nickname..."
              placeholderTextColor="grey"
              onChangeText={(text) =>
                setVariables({ ...variables, nickName: text })
              }
              value={variables.nickName}
            /> */}
            <Text style={[styles.inputLabel, { color: colors.purple }]}>
              Email
            </Text>
            <TextInput
              style={[styles.inputBox, { backgroundColor: colors.white }]}
              placeholder="Enter email..."
              placeholderTextColor="grey"
              // onChangeText={(text) =>
              //   setVariables({ ...variables, email: text })
              // }
              value={variables.email}
            />
            <Text style={[styles.inputLabel, { color: colors.purple }]}>
              Password
            </Text>
            <TextInput
              style={[styles.inputBox, { backgroundColor: colors.white }]}
              placeholder="Enter new password..."
              placeholderTextColor="grey"
              onChangeText={(text) => {
                setVariables({ ...variables, password: text });
              }}
              value={variables.password}
            />
            <Text style={[styles.inputLabel, { color: colors.purple }]}>
              Password (control)
            </Text>
            <TextInput
              style={[styles.inputBox, { backgroundColor: colors.white }]}
              placeholder="Enter new password again..."
              placeholderTextColor="grey"
              onChangeText={(text) => {
                setVariables({ ...variables, passwordControl: text });
              }}
              value={variables.passwordControl}
            />

            <TouchableWithoutFeedback
              onPress={(e) => {
                if (variables.password === variables.passwordControl) {
                  /*submit changes to backend + */
                  submitForm(e);

                  // setVariables({
                  //   ...variables,
                  //   password: initState.password,
                  //   passwordControl: initState.passwordControl,
                  // });
                } else {
                  setMessage({
                    text: "PASSWORDS DON'T MATCH",
                    color: "orange",
                  });
                }
              }}
            >
              <View style={styles.loginButton}>
                <Text style={styles.loginButtonText}>Submit changes</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        )}
      </ScrollView>
      {changeInfo && (
        <TouchableWithoutFeedback
          onPress={() => {
            setVariables(variables);
            setChangeInfo(false);
          }}
        >
          <Text
            style={[
              styles.cardText,
              {
                color: colors.dkPink,
                fontFamily: fonts.semiBold,
                marginTop: "10%",
                marginBottom: "15%",
              },
            ]}
          >
            Go back
          </Text>
        </TouchableWithoutFeedback>
      )}

      {!changeInfo && (
        <TouchableWithoutFeedback onPress={() => signOut()}>
          <Text
            style={[
              styles.cardText,
              {
                color: colors.ltPurple,
                fontFamily: fonts.semiBold,
                marginTop: 20,
                marginBottom: !single ? 20 : "20%",
              },
            ]}
          >
            Log out
          </Text>
        </TouchableWithoutFeedback>
      )}

      {showMessage()}
      {!single && <NavButtons screen="Settings" />}
      {changeProfilePicture && (
        <ChangeProfilePicture
          hide={hideOptions}
          nav="Settings"
          pickPhoto={pickPhoto}
        />
      )}
    </View>
  );
}
