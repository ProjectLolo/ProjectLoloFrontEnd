import React,{useState} from "react";
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput,
  TouchableOpacity, 
  ScrollView, 
  TouchableWithoutFeedback } from "react-native";
import style from "../../styles" 

export default function CreateKidCircles({ navigation }) {
  const [name, setName] = useState("");
  const [nickname, setNickname]=useState("")
  const[dateOfBirth,setDOB] =useState("")

  return (
    <View >
      <ScrollView>
        <Text style={[styles.text]}>Child's Info : </Text>
        <View style={styles.inputContainer}>
          <TextInput
          style={styles.textInput}
          placeholder="Kid's name"
          maxLength={20}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
          style={styles.textInput}
          placeholder="Nickname"
          maxLength={20}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
          style={styles.textInput}
          placeholder="Date of Birth"
          maxLength={20}
          />
        </View>
        
        <Text style={[styles.privacyText, style.fontFamily]}>Peekabond respects your privacy and keep your and your child's data safe and secure. 
        By pressing continue and creating an account, you agree to Peekabond's Terms of use and Privacy Policy.
        </Text>
        <View style={[style.center, style.dkPink,styles.spacing]}>
          <TouchableOpacity>
            <Text style={style.button}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      
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
    textAlign:"center"
  },
  privacyText:{
    fontSize:15,
    textAlign:"center"
  },
  inputContainer: {
    paddingTop: 15
  },
  textInput: {
    borderColor: '#CCCCCC',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: 30,
    fontSize: 15,
    textAlign:"center"
  },
  spacing:{
    margin:10
  }
})