import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  ImageBackground,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const {width, height} = Dimensions.get('window');

const users = [
  {
    name: 'Prathamesh',
    uri: 'https://media.istockphoto.com/photos/millennial-male-team-leader-organize-virtual-workshop-with-employees-picture-id1300972574?b=1&k=20&m=1300972574&s=170667a&w=0&h=2nBGC7tr0kWIU8zRQ3dMg-C5JLo9H2sNUuDjQ5mlYfo=',
  },
  {
    name: 'Somesh',
    uri: 'https://images.unsplash.com/photo-1457449940276-e8deed18bfff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
  },
  {
    name: 'Ajinkya',
    uri: 'https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
  },
  {
    name: 'Siddhesh',
    uri: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
  },
  {
    name: 'Pratik',
    uri: 'https://images.unsplash.com/photo-1466112928291-0903b80a9466?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
  },
  {
    name: 'Athrava',
    uri: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
  },
];

const HomeScreen = ({navigation}) => {
  const [search, setSearch] = useState('');

  const [AllUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const getExeType = async () => {
      try {
        const UsersList = [];
        await firestore()
          .collection('users')
          .get()
          .then(result => {
            // console.log(result.size);
            result.forEach(doc => {
              const {email, gender, name, password, image} = doc.data();
              UsersList.push({
                email,
                gender,
                name,
                password,
                image,
              });
            });
          });
        setAllUsers(UsersList);
        console.log(UsersList);
      } catch (error) {
        console.log(error);
      }
    };

    getExeType();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <View style={styles.TitleContainer}>
          <Text style={styles.TitleText}>Message</Text>
        </View>
        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search here..."
            value={search}
            onChangeText={text => setSearch(text)}
            placeholderTextColor={'#878787'}
          />
          <TouchableOpacity>
            <FontAwesome5
              style={{marginLeft: 10}}
              name="search"
              size={20}
              color={'#6C74CF'}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.userCards}>
        <ScrollView>
          {AllUsers.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={styles.userCard}
                onPress={() => navigation.navigate('ChatSpace')}>
                <View style={styles.ProfilePic}>
                  <Image
                    source={{
                      uri: item.image,
                    }}
                    style={styles.image}
                  />
                </View>
                <View style={styles.userName}>
                  <Text style={styles.userNameText}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#fff',
  },
  upperContainer: {
    display: 'flex',
    height: height / 3.8,
    backgroundColor: '#547AF1',
    padding: 20,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  TitleContainer: {
    marginTop: 5,
    marginBottom: 15,
    padding: 5,
  },
  TitleText: {
    color: '#fff',
    fontSize: 35,
    fontWeight: 'bold',
  },
  searchBarContainer: {
    flexDirection: 'row',
    backgroundColor: '#DEDFFD',
    borderRadius: 30,
    alignItems: 'center',
    paddingHorizontal: 15,
    height: 55,
    marginTop: 10,
  },
  searchInput: {
    flexGrow: 1,
    paddingVertical: 5,
    fontWeight: 'bold',
    color: '#000',
    fontWeight: '500',
  },
  lowerContainer: {},
  userCards: {
    marginTop: 5,
    flex: 1,
    marginBottom: 80,
  },
  userCard: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 20,
  },
  ProfilePic: {},
  image: {
    width: 45,
    height: 45,
    borderRadius: 50,
  },
  userName: {
    marginLeft: 20,
  },
  userNameText: {
    color: '#000',
    fontSize: 23,
  },
});
