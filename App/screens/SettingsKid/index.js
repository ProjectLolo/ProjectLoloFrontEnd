import React, { useState, useEffect, useContext } from "react";
import * as firebase from "firebase";
import * as ImagePicker from "expo-image-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { MaterialIcons } from "@expo/vector-icons";
import moment from "moment";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  ScrollView,
  Dimensions,
  Image,
  ActivityIndicator,
  TextInput,
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

import { AuthContext } from "../../context/Auth";

export default function SettingsKid({ route, navigation }) {
  const { signOut } = useContext(AuthContext);
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
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
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

    setMessage({ text: "Submitted!!!", color: "teal" });
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

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    hideDatePicker();
    setKidInfo({ ...kidInfo, birthdate: date });
  };

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
                {kidInfo.name}
              </Text>
            </View>

            <Text
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
                {kidInfo.nickName}
              </Text>
            </View>

            <Text
              style={[
                styles.inputLabel,
                { color: colors.purple, paddingTop: 0 },
              ]}
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
            <Text style={styles.inputLabel}>Name</Text>
            <TextInput
              style={styles.inputBox}
              placeholder="Kid's name"
              value={kidInfo.name}
              onChangeText={(text) => setKidInfo({ ...kidInfo, name: text })}
            />

            <Text style={styles.inputLabel}>Nickname</Text>
            <TextInput
              style={styles.inputBox}
              placeholder="Nickname"
              maxLength={20}
              value={kidInfo.nickName}
              onChangeText={(text) =>
                setKidInfo({ ...kidInfo, nickName: text })
              }
            />

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View
                style={{
                  marginLeft: "5%",
                  paddingBottom: 5,
                  paddingTop: "5%",
                  width: "66.5%",
                }}
              >
                <Text
                  style={{
                    fontFamily: fonts.regular,
                    paddingBottom: 23,
                    color: colors.purple,
                  }}
                >
                  Date of birth
                </Text>
                <TouchableWithoutFeedback onPress={() => showDatePicker()}>
                  <View
                    style={[
                      styles.inputBox,
                      { width: "100%", justifyContent: "center" },
                    ]}
                  >
                    <Text
                      style={{
                        fontFamily: fonts.regular,
                        color: colors.grey,
                        fontSize: adjust(16),
                        opacity: kidInfo.birthdate ? 1 : 0.5,
                        textAlign: "center",
                      }}
                    >
                      {kidInfo.birthdate
                        ? moment(kidInfo.birthdate).format("DD-MM-YYYY")
                        : "DD/MM/YYYY"}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
              <MaterialIcons
                style={{
                  alignSelf: "flex-end",
                  paddingBottom: 13,
                  paddingRight: "8%",
                }}
                name={"date-range"}
                size={50}
                color={colors.dkPink}
                onPress={() => {
                  showDatePicker();
                }}
              />
            </View>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              date={
                kidInfo.birthdate ? new Date(kidInfo.birthdate) : new Date()
              }
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </View>
        )}
      </ScrollView>

      {changeInfo && (
        <TouchableWithoutFeedback
          onPress={(e) => {
            submitForm(e);
          }}
        >
          <View style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Submit changes</Text>
          </View>
        </TouchableWithoutFeedback>
      )}

      {changeInfo && (
        <TouchableWithoutFeedback
          onPress={() => {
            setKidInfo(kidInfo);
            setChangeInfo(false);
          }}
        >
          <Text
            style={[
              styles.cardText,
              {
                color: colors.dkPink,
                fontFamily: fonts.semiBold,
                marginTop: "5%",
                marginBottom: "5%",
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
                marginBottom: 20,
              },
            ]}
          >
            Log out
          </Text>
        </TouchableWithoutFeedback>
      )}

      {showMessage()}
      {changeProfilePicture && (
        <ChangeProfilePicture
          hide={hideOptions}
          nav="SettingsKid"
          pickPhoto={pickPhoto}
        />
      )}

      <NavButtons screen="Settings" />
    </View>
  );
}
