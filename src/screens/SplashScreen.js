import React, {useState, useEffect} from 'react';
import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import Lottie from 'lottie-react-native';

const SplashScreen = ({navigation}) => {
  setTimeout(() => {
    navigation.replace('Login');
  }, 4000);
  return (
    <View style={styles.container}>
      <View style={styles.LottieContainer}>
        <Lottie
          source={require('../assets/chatanim.json')}
          autoPlay
          loop
          style={styles.illu}
        />
      </View>
      <View style={styles.TextContainer}>
        <Text style={styles.SplashText}>ChatEase</Text>
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  LottieContainer: {
    height: 500,
    marginTop: 70,
  },
  TextContainer: {
    width: '100%',
    height: 100,
    marginTop: 150,
  },
  SplashText: {
    fontSize: 30,
    color: '#000',
    textAlign: 'center',
  },
  illu: {
    marginTop: 50,
    height: 400,
    width: 400,
  },
});
