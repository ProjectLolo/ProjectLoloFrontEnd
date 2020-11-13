import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/Auth";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  TextInput,
  ScrollView,
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

  const { signOut } = useContext(AuthContext);

  const profileInfo = {

    firstName: data && data.findUserById.firstName,
    lastName: data && data.findUserById.lastName,
    nickName: null,
    email: data && data.findUserById.email,
    password: "",
    profilePic: "",

//     firstName: "Atieh",
//     lastName: "ha",
//     nickName: null,
//     email: "test1@email.com",
//     password: "1234",
//     profilePic: "dff",

  };

  const initState = {
    firstName: profileInfo.firstName,
    lastName: profileInfo.lastName,
    nickName: profileInfo.nickName,
    email: profileInfo.email,
    profilePic: profileInfo.profilePic,
    password: "",
    passwordControl: "",
  };
  const [photo, setPhoto] = useState();
  const [variables, setVariables] = useState(initState);
  const [changeProfilePicture, setChangeProfilePicture] = useState(false);
  const [changeInfo, setChangeInfo] = useState(false);
  const [successMessage, setSuccessMessage] = useState({ text: "", color: "" });


  const { data, refetch } = useQuery(FIND_USER_BY_ID, {
    variables: {
      id: route.params.activeUser,
    },
  });
  console.log("I want userId", data);

  useEffect(() => {
    refetch();
    setVariables({
      firstName: data.findUserById.firstName,
      lastName: data.findUserById.lastName,
      nickName: data.findUserById.nickName,
      email: data.findUserById.email,
      profilePic: data.findUserById.profilePic,
      password: "",
      passwordControl: "",
    });
  }, [data, isFocused]);

  const [submitSettings, { error }] = useMutation(SETTINGS, {
    onError: (error) =>
      //TODO: give proper error message , now just giving the user the error from graphQL
      error.graphQLErrors.map(({ message }, i) => alert(`${message}`)),
    // onCompleted({ submitSettings }) {
    //   if (submitSettings.token) {
    //     signUp(signup.token);
    //   }
    // },
  });

  function submitForm(e) {
    e.preventDefault();
    setPhoto(route.params.result);
    console.log(photo);
    photo ? photo : setVariables.profilePic;
    setVariables({ ...variables, profilePic: photo });
    submitSettings({ variables });
  }
  function hideOptions() {
    setChangeProfilePicture(false);
  }

  function showMessage() {
    if (successMessage.text !== "" && successMessage.color !== "") {
      setTimeout(() => {
        setSuccessMessage({ text: "", color: "" });
      }, 2000);
      return (
        <View>
          <Text
            style={[
              styles.cardText,
              {
                color: colors[successMessage.color],
                fontFamily: fonts.semiBold,
                paddingVertical: 15,
              },
            ]}
          >
            {successMessage.text}
          </Text>
        </View>
      );
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: "space-evenly" }}>
      <NavHome />

      <ScrollView>
        <TouchableWithoutFeedback onPress={() => setChangeProfilePicture(true)}>
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
            <Image style={styles.cardImage} source={images.monkey} />
          </View>
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
                  setChangeInfo(false),
                    setSuccessMessage({ text: "SUCCESS!!!", color: "teal" }),
                    setVariables({
                      ...variables,
                      password: initState.password,
                      passwordControl: initState.passwordControl,
                    });
                } else {
                  setSuccessMessage({
                    text: "PASSWORDS DON'T MATCH",
                    color: "orange",
                  });
                }
              }}
            >
              <Text
                style={[
                  styles.cardText,
                  {
                    color: colors.dkPink,
                    fontFamily: fonts.semiBold,
                    marginTop: 20,
                    marginBottom: 20,
                  },
                ]}
              >
                Submit changes
              </Text>
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
                marginTop: 20,
                marginBottom: 20,
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
        <ChangeProfilePicture hide={hideOptions} nav="Settings" />
      )}
    </View>
  );
}
