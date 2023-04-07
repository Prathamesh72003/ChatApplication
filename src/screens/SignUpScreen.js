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
  Image
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {TextInput, Button} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const {width, height} = Dimensions.get('window');
const SignUpScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [Name, setName] = useState();
  const [phone, setPhone] = useState()
  const [gender, setGender] = useState()
  const [password, setPassword] = useState();

  const signupfun = async () => {
    if (
      email === '' &&
      Name === '' &&
      phone === '' &&
      gender === '' &&
      password === ''
    ) {
      ToastAndroid.show(
        'Enter the required fields',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    } else {
      await auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          firestore()
            .collection('users').doc(email)
            .set({
              email: email,
              name: Name,
              gender: phone,
              gender: gender,
              password: password,
              uri: 'https://cdn.vox-cdn.com/thumbor/xBIBkXiGLcP-kph3pCX61U7RMPY=/0x0:1400x788/1200x800/filters:focal(588x282:812x506)/cdn.vox-cdn.com/uploads/chorus_image/image/70412073/0377c76083423a1414e4001161e0cdffb0b36e1f_760x400.0.png'
            })
            .then(() => {
              console.log('User added successfully!');
            });
          ToastAndroid.show(
            'Registered Successfully',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
          navigation.replace('Login');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            // console.log('That email address is already in use!');
            ToastAndroid.show(ToastAndroid.SHORT, ToastAndroid.CENTER);
          }

          if (error.code === 'auth/invalid-email') {
            // console.log('That email address is invalid!');
            ToastAndroid.show(
              'The email address is invalid!',
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
          }
          if (error.code === 'auth/weak-password') {
            'That email address is already in use!',
              // console.log('Password should be more than 6 digits!');
              ToastAndroid.show(
                'Password should be more than 6 digits!',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
              );
          }

          console.error(error);
        });
    }
  };

  return (
    <ScrollView>
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
            <Text style={styles.WelcomeText}>Create an account</Text>
            <View style={{display: 'flex', flexDirection: 'row', marginTop: 5}}>
              <Text style={styles.RegisterText}>Already an user? </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={styles.RegisterSub}>Login Now</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.formContainer}>
              <TextInput
                style={styles.inputContainer}
                label="Name"
                value={Name}
                onChangeText={text => setName(text)}
                mode="outlined"
              />
              <TextInput
                style={styles.inputContainer}
                label="Email"
                value={email}
                onChangeText={text => setEmail(text)}
                mode="outlined"
              />
              <TextInput
                style={styles.inputContainer}
                label="Phone"
                keyboardType="numeric"
                value={phone}
                onChangeText={text => setPhone(text)}
                mode="outlined"
              />

              <View style={styles.genderContainer}>
                <TouchableOpacity
                  onPress={() => setGender('male')}
                  style={[
                    styles.boxContainer,
                    {
                      backgroundColor: gender == 'male' ? '#000' : '#fff',
                      color: gender == 'male' ? '#fff' : '#000',
                    },
                  ]}>
                  <View style={styles.box}>
                    <FontAwesome5
                      name="male"
                      size={18}
                      color={gender == 'male' ? '#fff' : '#000'}
                    />
                    <Text style={{color: gender == 'male' ? '#fff' : '#000'}}>
                      Male
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.boxContainer,
                    {
                      backgroundColor: gender == 'female' ? '#000' : '#fff',
                      color: gender == 'male' ? '#fff' : '#000',
                    },
                  ]}
                  onPress={() => setGender('female')}>
                  <View style={styles.box}>
                    <FontAwesome5
                      name="female"
                      size={18}
                      color={gender == 'female' ? '#fff' : '#000'}
                    />
                    <Text style={{color: gender == 'female' ? '#fff' : '#000'}}>
                      Female
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              <TextInput
                style={styles.inputContainer}
                label="Password"
                secureTextEntry={true}
                value={password}
                onChangeText={text => setPassword(text)}
                mode="outlined"
              />

              <View style={styles.loginBtnContainer}>
                <Button
                  style={{
                    width: '60%',
                    borderRadius: 30,
                    elevation: 5,
                    backgroundColor: '#FD274A',
                  }}
                  mode="contained"
                  onPress={() => signupfun()}>
                  Register
                </Button>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUpScreen;

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
  },
  formContainer: {
    marginTop: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  forgotPassword: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  loginBtnContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    // marginBottom: 30,
  },
  otherLoginConatiner: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
  },
  boxContainer: {
    width: 100,
    height: 30,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    // backgroundColor: '#fff',
    marginBottom: 20,
    marginTop: 5
  },
  box: {
    flex: 1,
    flexDirection: 'row',
    width: 80,
    justifyContent: 'space-around',
    // justifyContent: 'center',
    alignItems: 'center',
  },
});
