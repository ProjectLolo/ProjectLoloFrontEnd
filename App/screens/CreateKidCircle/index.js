import React,{useState} from "react";
import DatePicker from 'react-native-datepicker';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput,
  TouchableOpacity, 
  TouchableWithoutFeedback } from "react-native";
import style from "../../styles" 

export default function CreateKidCircles({ navigation }) {
  const [name, setName] = useState("");
  const [nickname, setNickname]=useState("")
  const[dateOfBirth,setDOB] =useState("")
console.log("name:",name)
  return (
    <View style={[style.fontFamily, styles.container]}>
     
        <Text style={[styles.text]}>Child's Info</Text>
        
        <View style={[styles.spacing]}>
        <Text style={[styles.label]}>Name</Text>
          <TextInput style={[styles.input]}
          label='Name'
          placeholder="Kid's name"
          value={name}
          onChangeText={(text)=>setName(text)}
          />
        
        <Text style={[styles.label]}>Nickname</Text>
          <TextInput style={[styles.input]}
          placeholder="Nickname"
          maxLength={20}
          value={nickname}
          onChangeText={(text)=>setNickname(text)}
          />
       
        <Text style={[styles.label]}>Date of birth</Text>
        <DatePicker style={[styles.input]}
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

        <Text style={[styles.privacyText, style.fontFamily]}>
          Peekabond respects your privacy and keep your and your child's data safe and secure. 
          By pressing continue and creating an account, you agree to Peekabond's Terms of use and Privacy Policy.
        </Text>

        <View style={[style.button, style.dkPink]}>
          <TouchableOpacity onPress={() => navigation.navigate("UploadKidProfile",{ kidName: name })}>
            <Text style={style.button}>Next</Text>
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

const styles=StyleSheet.create({
  text:{
    fontSize:30,
    textAlign:"center",
  },
  privacyText:{
    fontSize:10,
    textAlign:"left",
    margin:15
  },
  container: {
    flex: 1,
    alignItems:"center",
    justifyContent: 'center',
  },
 
  label:{
    fontSize:18
  },
  input: {
    width: 300,
    height: 50,
    padding:10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius:5,
    marginBottom: 15,
  },
  spacing:{
    margin:25
  },
  datePickerStyle: {
    width: 300, 
  },
})