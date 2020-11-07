import React,{ useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment"
import { Keyboard, 
  View, 
  Text, 
  TextInput,
  TouchableOpacity, 
  TouchableWithoutFeedback } from "react-native";
import styles from "../../styles" 
import style from "./style"

export default function CreateKidCircles({ navigation }) {
  const today = new Date()
  const [name, setName] = useState(null)
  const [nickname, setNickname]=useState(null)
  const[dateOfBirth,setDOB] = useState(new Date(today))
  
  const handleDateChange =(event,selectedDate) =>{
    const currentDate=selectedDate|| dateOfBirth;
    setDOB(currentDate)
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={[styles.fontFamily, style.container]}>
     
        <Text style={[style.text]}>Child's Info</Text>
        
        <View style={[style.spacing]}>
        <Text style={[style.label]}>Name</Text>
        <TextInput style={[style.input]}
          label='Name'
          placeholder="Kid's name"
          value={name}
          onChangeText={(text)=>setName(text)}
        />
        
        <Text style={[style.label]}>Nickname</Text>
        <TextInput style={[style.input]}
          placeholder="Nickname"
          maxLength={20}
          value={nickname}
          onChangeText={(text)=>setNickname(text)}
        />
          
        <Text style={[style.label]}>Date of birth</Text>
        <DateTimePicker
          mode={"date"}
          value={dateOfBirth}
          is24Hour={false}
          display="default"
          onChange={handleDateChange}
        />
       </View>

        <Text style={[style.privacyText, styles.fontFamily]}>
          Peekabond respects your privacy and keep your and your child's data safe and secure. 
          By pressing continue and creating an account, you agree to Peekabond's Terms of use and Privacy Policy.
        </Text>

        <View style={[styles.dkPink, styles.button]}>
          <TouchableOpacity onPress={() => navigation.navigate("UploadKidProfile",
          { kidName:name,
          kidNickname:nickname,
          kidDateofBirth:moment(dateOfBirth).format('DD/MM/YYYY')})}>
            <Text style={styles.button}>Next</Text>
          </TouchableOpacity>
        </View>
      
    </View>
    </TouchableWithoutFeedback>
  );
}
