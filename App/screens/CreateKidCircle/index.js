import React, { useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { MaterialIcons } from "@expo/vector-icons";
import {
  Keyboard,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
} from "react-native";

import styles from "@styles/styles";
import style from "./style";
import images from "@assets/images";
import colors from "@assets/colors";
import NavHome from "../../components/NavHome";
import fonts from "@assets/fonts";
import adjust from "../../styles/adjust";
import { useMutation } from "@apollo/client";
import { CREATE_KID } from "../../../graphql/mutations";
import { UPDATE_KID_PROFILE } from "../../../graphql/mutations";

export default function CreateKidCircles({ route, navigation }) {
  const { userName } = route.params;
  const [profile, setProfile] = useState({
    created: false,
    kidId: "",
  });

  const [message, setMessage] = useState({
    color: "",
    text: "",
  });

  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [dateOfBirth, setDOB] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    hideDatePicker();
    setDOB(date);
  };

  const [createKid, { error }] = useMutation(CREATE_KID, {
    onError: (error) => {
      console.log("mutation create kid", error.graphQLErrors);
      //setErrors({ errorFound: true, errorMessage: error.graphQLErrors.map(errObject => errObject.message)})
    },
    onCompleted(data) {
      console.log("create kid completed", data);
      setProfile({ created: true, kidId: data.createKid._id });
      navigation.navigate("UploadKidProfile", {
        profile: data.createKid,
        userName,
      });
    },
  });

  //update the row,if user moves back from UploadKidProfile Screen
  const [updateKid, { updateerror }] = useMutation(UPDATE_KID_PROFILE, {
    onError: (error) => console.log("mutation update kid", error.graphQLErrors),
    onCompleted(data) {
      console.log("updatekid completed", data);
      navigation.navigate("UploadKidProfile", {
        profile: data.updateKidProfile
      });
    },
  });

  function onSubmitHandler() {
    if (name.trim() === "") {
      setMessage({
        text: "Kid name is required!",
        color: "orange",
      });
    }

    //console.log("profile:",profile)
    if (!profile.created) {
      createKid({
        variables: {
          name: name,
          nickName: nickname,
          birthdate: dateOfBirth,
          profileImageUrl: "",
        },
      });
    } else {
      updateKid({
        variables: {
          id: profile.kidId,
          name: name,
          nickName: nickname,
          birthdate: dateOfBirth,
          profileImageUrl: "",
        },
      });
    }
  }

  const showMessage = () => {
    //console.log("message:",message)
    if (message.text !== "" && message.color !== "") {
      setTimeout(() => {
        setMessage({ text: "", color: "" });
      }, 2000);
      return (
        <View>
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
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <View style={{ marginBottom: -80 }}>
          <NavHome onlyBack={true} />
        </View>
        <Text
          style={[styles.title, { fontSize: adjust(25), marginBottom: "5%" }]}
        >
          Child's Info
        </Text>

        <Text style={styles.inputLabel}>Name</Text>
        <TextInput
          style={styles.inputBox}
          placeholder="Kid's name"
          value={name}
          onChangeText={(text) => setName(text)}
        />

        <Text style={styles.inputLabel}>Nickname</Text>
        <TextInput
          style={styles.inputBox}
          placeholder="Nickname"
          maxLength={20}
          value={nickname}
          onChangeText={(text) => setNickname(text)}
        />

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
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
                    opacity: dateOfBirth ? 1 : 0.5,
                    textAlign: "center",
                  }}
                >
                  {dateOfBirth
                    ? moment(dateOfBirth).format("DD-MM-YYYY")
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
          date={dateOfBirth ? new Date(dateOfBirth) : new Date()}
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        {showMessage()}
        <View style={[styles.loginButton, { marginTop: "30%" }]}>
          <TouchableOpacity onPress={onSubmitHandler}>
            <Text style={styles.loginButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>

        <Text
          style={{
            fontSize: adjust(8),
            textAlign: "center",
            marginHorizontal: "5%",
            marginBottom: "10%",
            fontFamily: fonts.regular,
          }}
        >
          Peekabond respects your privacy and keeps you and your child's data
          safe and secure. By pressing continue and creating an account, you
          agree to Peekabond's Terms of use and Privacy Policy.
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}
