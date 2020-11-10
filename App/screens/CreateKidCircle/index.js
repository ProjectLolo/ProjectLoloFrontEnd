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

export default function CreateKidCircles({ navigation }) {
  const today = new Date();
  const [name, setName] = useState(null);
  const [nickname, setNickname] = useState(null);
  const [dateOfBirth, setDOB] = useState(new Date(today));

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

        <Text style={[style.label]}>Nickname</Text>
        <TextInput
          style={styles.inputBox}
          placeholder="Nickname"
          maxLength={20}
          value={nickname}
          onChangeText={(text) => setNickname(text)}
        />

        <View style={{ flexDirection: "row" }}>
          <View>
            <Text style={[style.label]}>Date of birth</Text>
            <Text>{moment(dateOfBirth).format("DD/MM/YYYY")}</Text>
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
