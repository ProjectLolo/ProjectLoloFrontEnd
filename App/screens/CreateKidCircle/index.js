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
} from "react-native";

import styles from "../../styles";
import style from "./style";
import { ScrollView } from "react-native-gesture-handler";

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
      <ScrollView>
        <View style={[styles.fontFamily, style.container]}>
          <Text style={[style.text]}>Child's Info</Text>

          <View style={[style.spacing]}>
            <Text style={[style.label]}>Name</Text>
            <TextInput
              style={[style.input]}
              placeholder="Kid's name"
              value={name}
              onChangeText={(text) => setName(text)}
            />

            <Text style={[style.label]}>Nickname</Text>
            <TextInput
              style={[style.input]}
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
          </View>
          <Text style={[style.privacyText, styles.fontFamily]}>
            Peekabond respects your privacy and keep your and your child's data
            safe and secure. By pressing continue and creating an account, you
            agree to Peekabond's Terms of use and Privacy Policy.
          </Text>

          <View style={[styles.button,{backgroundColor:"#FF6E5A"}]}>
            <TouchableOpacity onPress={onSubmitHandler}>
           
            <Text style={styles.buttonText}>NEXT</Text>
          
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
