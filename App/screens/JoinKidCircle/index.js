import React,{useState} from "react";
import { View, Text, TextInput, TouchableWithoutFeedback } from "react-native";
import styles from "@styles/styles"
import style from "./style"

export default function JoinKidCircles({ navigation }) {
  const [familyCode, setFamilyCode] = useState(null)
  return (
    <View style={[style.container, style.spacing ]}>
       <Text style={[style.text]}>
      Joining a family! Please enter your family code
      </Text>

      <View>
        <Text style={[style.label,style.spacing]}>
          {`The code is provided by the owner of the family.`}
        </Text>
      </View>


      <View>
        <Text style={styles.inputLabel}>Enter Code</Text>
        <TextInput
          style={styles.inputBox}
          placeholder="Enter family code..."
          placeholderTextColor="grey"
          onChangeText={(text) => setFamilyCode(text)}
          value={familyCode}
        />
      </View>

      <TouchableWithoutFeedback 
        onPress={() => navigation.navigate("Recommended")}
      >
        <View style={[styles.pink, styles.button]}>
          <Text style={[styles.button]}>
            Confirm
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
