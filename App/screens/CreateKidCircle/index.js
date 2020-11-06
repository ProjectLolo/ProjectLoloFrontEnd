import React,{ useState } from "react";
import DatePicker from 'react-native-datepicker';
import {  
  View, 
  Text, 
  TextInput,
  TouchableOpacity, 
  TouchableWithoutFeedback } from "react-native";
import styles from "../../styles" 
import style from "./style"

export default function CreateKidCircles({ navigation }) {
  const [name, setName] = useState("");
  const [nickname, setNickname]=useState("")
  const[dateOfBirth,setDOB] =useState("")

  return (
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
        <DatePicker style={[style.input]}
          date={dateOfBirth} // Initial date from state
          mode="date" // The enum of date, datetime and time
          placeholder="DD-MM-YYYY"
          format="DD-MM-YYYY"
          minDate="01-01-2010"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateInput:{borderWidth: 0, alignItems: "flex-start"},  
          }}
          onDateChange={(date) => {
            setDOB(date);
          }}
        />
       </View>

        <Text style={[style.privacyText, styles.fontFamily]}>
          Peekabond respects your privacy and keep your and your child's data safe and secure. 
          By pressing continue and creating an account, you agree to Peekabond's Terms of use and Privacy Policy.
        </Text>

        <View style={[styles.dkPink, styles.button]}>
          <TouchableOpacity onPress={() => navigation.navigate("UploadKidProfile",{ kidName: name })}>
            <Text style={styles.button}>Next</Text>
          </TouchableOpacity>
        </View>
      
     
      
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate("Recommended")}
      >
        <Text style={{ textAlign: "center", marginTop: 50 }}>
          Press here to go to Recommended
        </Text>
      </TouchableWithoutFeedback>
    </View>
  );
}
