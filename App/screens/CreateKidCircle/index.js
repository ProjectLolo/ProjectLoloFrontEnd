import React,{useState} from "react";
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

  return (
    <View style={[style.fontFamily, styles.container]}>
     
        <Text style={[styles.text]}>Child's Info</Text>
        
        <View style={[styles.spacing]}>
        <Text style={[styles.label]}>Name</Text>
          <TextInput style={[styles.input]}
          label='Name'
          placeholder="Kid's name"
          />
        
        <Text style={[styles.label]}>Nickname</Text>
          <TextInput style={[styles.input]}
          placeholder="Nickname"
          maxLength={20}
          />
       
       <Text style={[styles.label]}>Date of birth</Text>
          <TextInput style={[styles.input]}
          placeholder="Date of Birth"
          maxLength={20}
          />
       </View>
        <Text style={[styles.privacyText, style.fontFamily]}>Peekabond respects your privacy and keep your and your child's data safe and secure. 
        By pressing continue and creating an account, you agree to Peekabond's Terms of use and Privacy Policy.
        </Text>

        <View style={[style.button, style.dkPink]}>
          <TouchableOpacity>
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
    fontSize:12,
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
  }
})