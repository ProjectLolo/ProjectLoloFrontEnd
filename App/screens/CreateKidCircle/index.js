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

export default function CreateKidCircles({ navigation }) {
  const today = new Date();
  const [name, setName] = useState(null);
  const [nickname, setNickname] = useState(null);
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

  function onSubmitHandler() {
    navigation.navigate("UploadKidProfile", {
      kidName: name,
      kidNickname: nickname,
      kidDateofBirth: moment(dateOfBirth).format("DD/MM/YYYY"),
    });
  }

  console.log(dateOfBirth);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, justifyContent: "space-evenly" }}>
        <NavHome onlyBack={true} />
        <Text style={styles.title}>Child's Info</Text>

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

        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              marginLeft: "5%",
              paddingBottom: 5,
              paddingTop: "5%",
              width: "70%",
            }}
          >
            <Text style={{ fontFamily: fonts.regular, paddingBottom: 23 }}>
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
                    opacity: 0.5,
                    textAlign: "center",
                  }}
                >
                  {dateOfBirth
                    ? moment(dateOfBirth).format("DD/MM/YYYY")
                    : "DD/MM/YYYY"}
                </Text>
              </View>
            </TouchableWithoutFeedback>

            {/* <TouchableWithoutFeedback onPress={() => showDatePicker()}>
              <TextInput
                style={[styles.inputBox, { width: "100%" }]}
                placeholder="DD/MM/YYYY"
                maxLength={20}
                value={dateOfBirth}
                onChange={() => showDatePicker()}
              />
            </TouchableWithoutFeedback> */}
            {/* <Text>
              {dateOfBirth === "DD/MM/YYYY"
                ? dateOfBirth
                : moment(dateOfBirth).format("DD/MM/YYYY")}
            </Text> */}
          </View>
          <MaterialIcons
            style={{ position: "absolute", right: 0 }}
            name={"date-range"}
            size={40}
            color="#990000"
            onPress={() => {
              showDatePicker();
            }}
          />
        </View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          display="calender"
        />

        <Text style={[style.privacyText, styles.fontFamily]}>
          Peekabond respects your privacy and keep your and your child's data
          safe and secure. By pressing continue and creating an account, you
          agree to Peekabond's Terms of use and Privacy Policy.
        </Text>

        <View style={[styles.dkPink, styles.button]}>
          <TouchableOpacity onPress={onSubmitHandler}>
            <Text style={styles.button}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
