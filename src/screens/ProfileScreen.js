import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import auth from '@react-native-firebase/auth';

const {width, height} = Dimensions.get('window');

const ProfileScreen = ({navigation}) => {
  
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();


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


  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.upperContainer}>
          <View style={styles.ProfileIcon}>
            <FontAwesome5 name="user" size={80} color={'white'} />
            <Text
              style={{
                marginTop: 15,
                fontSize: 15,
                color: '#000',
                fontWeight: 'bold',
              }}>
              {user.email}
            </Text>
          </View>
        </View>
        {/* <View style={styles.middleContainer}>
          <View style={styles.components}>
            <TouchableOpacity onPress={() => navigation.navigate('MyOrders')}>
              <View style={styles.card}>
                <FontAwesome5 name="file-alt" size={30} color={'#000'} />
                <Text style={styles.componentText}>Documents</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.card}>
              <FontAwesome5 name="heart" size={30} color={'#000'} />
              <Text style={styles.componentText}>Favourites</Text>
            </View>
            <View style={styles.card}>
              <FontAwesome5 name="bell" size={30} color={'#000'} />
              <Text style={styles.componentText}>Notifications</Text>
            </View>
          </View>
        </View> */}
        <View style={styles.LowerContainer}>
          <View style={styles.TabList}>
            {/* <TouchableOpacity onPress={() => navigation.navigate('EditProfile', {uemail: user.email})}>
              <View style={styles.listItem}>
                <View style={styles.Icon}>
                  <FontAwesome5 name="pen" size={25} color={'#000'} />
                </View>
                <View style={styles.ListTextContainer}>
                  <Text style={styles.ListText}>Edit Profile</Text>
                </View>
              </View>
            </TouchableOpacity> */}
            {/* <TouchableOpacity onPress={() => navigation.navigate('ComplaintHistory')}>
              <View style={styles.listItem}>
                <View style={styles.Icon}>
                  <FontAwesome5 name="file-invoice" size={25} color={'#000'} />
                </View>
                <View style={styles.ListTextContainer}>
                  <Text style={styles.ListText}>Complaint History</Text>
                </View>
              </View>
            </TouchableOpacity> */}
            <TouchableOpacity onPress={() => {
              auth()
                .signOut()
                .then(() => {
                  // console.log('done');
                  navigation.replace('Login');
                });
            }}>
              <View style={styles.listItem}>
                <View style={styles.Icon}>
                  <FontAwesome5 name="sign-out-alt" size={25} color={'#000'} />
                </View>
                <View style={styles.ListTextContainer}>
                  <Text style={styles.ListText}>Logout</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
  },
  upperContainer: {
    display: 'flex',
    height: height / 3,
    backgroundColor: '#EEE6FF',
    padding: 20,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius:40
  },
  ProfileIcon: {
    marginBottom: 20,
    display: 'flex',
    // justifyContent: "center",
    alignItems: 'center',
    marginTop: 30,
  },
  middleContainer: {
    backgroundColor: '#fff',
    marginTop: -50,
    // marginBottom: 20,
    borderRadius: 40,
    padding: 25,
    elevation: 10,
  },
  components: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  card: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  componentText: {
    marginTop: 10,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
  },
  LowerContainer: {
    padding: 40,
    // backgroundColor: '#F3F3F3',
  },
  TabList: {},
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  Icon: {
    marginBottom: 20,
  },
  ListTextContainer: {
    marginLeft: 20,
    marginBottom: 20,
  },
  ListText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
