import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  Image,
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const {width, height} = Dimensions.get('window');
const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const loginfun = async () => {
    if (email === '' && password === '') {
      ToastAndroid.show(
        'Enter the required fields',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    } else {
      await auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          ToastAndroid.show(
            'Logged in Successfully',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
          navigation.replace('Home', {email: email});
        })
        .catch(error => {
          if (error.code === 'auth/invalid-email') {
            // console.log('The email address is invalid!');
            ToastAndroid.show(
              'Invalid email address!',
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
          }
          if (error.code === 'auth/wrong-password') {
            // console.log('The password does not matches the email id!');
            ToastAndroid.show(
              'Invalid password!',
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
          }

          console.log(error);
        });
    }
  };

  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <View style={styles.container}>
        <ImageBackground
          source={require('../assets/background.jpg')}
          style={{height: height / 2.5}}>
          <View style={styles.UpperContainer}>
            {/* <FontAwsome5
                name="motorcycle"
                size={60}
                style={{color: '#fff'}}
              /> */}
            {/* <Image
              source={require('../assets/store.png')}
              style={{height: 100, width: 100, marginBottom: 30}}
            /> */}
            <Text style={styles.BrandText}>ChatEase</Text>
          </View>
        </ImageBackground>
        <View style={styles.bottomContainer}>
          <View style={{padding: 30}}>
            <Text style={styles.WelcomeText}>Welcome</Text>
            <View style={{display: 'flex', flexDirection: 'row', marginTop: 5}}>
              <Text style={styles.RegisterText}>Don't have an account? </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('SignUp')}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={styles.RegisterSub}>Register Now</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.formContainer}>
              <TextInput
                style={styles.inputContainer}
                label="Email"
                value={email}
                onChangeText={text => setEmail(text)}
                mode="outlined"
              />
              <TextInput
                style={styles.inputContainer}
                label="Password"
                secureTextEntry={true}
                value={password}
                onChangeText={text => setPassword(text)}
                mode="outlined"
              />
              <View style={styles.forgotPassword}>
                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{fontSize: 15, fontWeight: 'bold', color: '#000'}}>
                    Forgot Password?
                  </Text>
                </View>
                <TouchableOpacity
                  style={{width: '30%'}}
                  // icon="camera"
                  mode="outlined"
                  onPress={() => {
                    console.log('To be done!');
                  }}>
                  <Text
                    style={{
                      color: '#FD274A',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      fontSize: 15,
                    }}>
                    Reset
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.LoginScreenBtnContainer}>
                <Button
                  style={{
                    width: '60%',
                    borderRadius: 30,
                    elevation: 5,
                    backgroundColor: '#FD274A',
                  }}
                  mode="contained"
                  onPress={() => loginfun()}>
                  Login
                </Button>
              </View>
              {/* <View style={styles.otherLoginScreenConatiner}>
                <TouchableOpacity onPress={() => console.log('google')}>
                  <Image
                    source={require('../assets/google.png')}
                    style={{height: 65, width: 50}}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => console.log('facebook')}>
                  <Image
                    source={require('../assets/facebook.png')}
                    style={{height: 40, width: 50}}
                  />
                </TouchableOpacity>
              </View> */}
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    display: 'flex',
    // justifyContent: 'center',
    // alignItems: "center",
    flex: 1,
  },
  UpperContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    // marginTop:
  },
  BrandText: {
    marginTop: 10,
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
  },
  bottomContainer: {
    flex: 1.5,
    bottom: 60,
    backgroundColor: '#fff',
    borderTopStartRadius: 60,
    borderTopEndRadius: 60,
  },
  WelcomeText: {
    fontSize: 30,
    color: '#FD274A',
    fontWeight: 'bold',
  },
  RegisterText: {
    fontSize: 15,
    color: '#000',
  },
  RegisterSub: {
    fontSize: 15,
    color: '#FD274A',
    marginBottom: 20,
  },
  formContainer: {
    marginTop: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  forgotPassword: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  LoginScreenBtnContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  otherLoginScreenConatiner: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
