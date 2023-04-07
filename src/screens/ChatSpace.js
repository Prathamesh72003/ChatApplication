import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
  ToastAndroid
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


const ChatSpace = ({navigation}) => {
  const [messages, steMessages] = useState([])
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [chatMsg, setChatMsg] = useState("")

  useEffect(() => {
    const getMessages = async () => {
      try {
        const MessageList = [];
        await firestore()
          .collection('messages').orderBy('sentAt')
          .get()
          .then(result => {
            // console.log(result.size);
            result.forEach(doc => {
              const {text,userId} = doc.data();
              MessageList.push({
                text,
                userId
              });
            });
          });
          steMessages(MessageList);
          console.log(MessageList);
      } catch (error) {
        console.log(error);
      }
    };
  
    getMessages();
    
  }, [messages]);

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  if (!user) {
    return navigation.replace('Login');
  }

  const SendChat = async () => {
    if (chatMsg != "") {
      await firestore()
        .collection('messages')
        .add({
          text: chatMsg,
          userId: user.uid,
          sentAt: firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
          ToastAndroid.show(
            'Sent!',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        });
    }else{
       ToastAndroid.show(
         'Empty message cannot be sent!',
         ToastAndroid.SHORT,
         ToastAndroid.CENTER,
       );
    }
  };

  this.myTextInput = React.createRef();
  return (
    <View style={styles.maincontainer}>
      <View style={styles.middleConatiner}>
        <View style={styles.Messages}>
          <ScrollView>
            {messages.map((item, index) => {
              return (
                <View key={index} style={[styles.Message,{position: "relative",backgroundColor: user.uid == item.userId ? "#cbb3ff" : "#E57F84", left: user.uid == item.userId ? 0 : 0}]}>
                  <Text style={styles.MessageText}>{item.text}</Text>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>

      <View style={styles.footer}>
        <TextInput
          marginLeft={10}
          placeholder="Type message here..."
          placeholderTextColor={'black'}
          color="black"
          backgroundColor="#fff"
          value={chatMsg}
          ref={this.myTextInput}
          onChangeText={text => setChatMsg(text)}
          style={styles.inputf} />

        <View style={styles.sendicon}>
          <TouchableOpacity onPress={() => {SendChat(),this.myTextInput.current.clear()}}>
            <FontAwesome5
              name="paper-plane"
              color="black"
              size={22}
              marginLeft={12}
              marginTop={15}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ChatSpace;

const styles = StyleSheet.create({
  maincontainer: {
    backgroundColor: '#FBF6F6',
    display: 'flex',
    flex: 1,
  },
  inputf: {
    borderRadius: 40,
    width: '80%',
    margin: 5,
    alignSelf: 'center',
    paddingHorizontal: 10
  },
  footer: {
    display: 'flex',
    // marginTop:600,
    position: 'absolute',
    bottom: 15,

    flexDirection: 'row',
  },
  sendicon: {
    backgroundColor: '#fff',
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
  },
  middleConatiner: {
    height: '100%',
    paddingVertical: 20
  },
  Messages: {
    display: 'flex',
    flexDirection: 'column',
    height: '82%',
    width: '100%',
    overflow: 'hidden',
    paddingHorizontal: 5,
  },
  Message: {
    margin: 10,
    borderRadius: 20,
    padding: 12,
    alignSelf: 'flex-start',
    elevation: 5,
  },
  MessageText: {
    color: 'black'
  },
});
