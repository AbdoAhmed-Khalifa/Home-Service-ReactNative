import { Text, View, Image, StyleSheet } from 'react-native';
import React from 'react';
import SignInWithOAuth from '@/components/SignInWithOAuth';
import Colors from '@/constants/Colors';

export default function SignIn() {
  return (
    <View style={{ alignItems: 'center' }}>
      <Image
        style={styles.loginImage}
        source={require('@/assets/images/LoginThree.jpg')}
      />
      <View style={styles.subContainer}>
        <Text style={{ fontSize: 24, color: 'white', textAlign: 'center' }}>
          Let's Find{' '}
          <Text style={{ fontWeight: 'bold' }}>
            Professional Cleaning and Repair Service
          </Text>
        </Text>
        <Text
          style={{
            color: 'white',
            fontSize: 17,
            textAlign: 'center',
            marginTop: 20,
          }}
        >
          Best App to find services near you witch delivery you a professional
          service
        </Text>
        <SignInWithOAuth />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loginImage: {
    width: 230,
    height: 450,
    marginTop: 70,
    borderWidth: 4,
    borderColor: Colors.BLACK,
    borderRadius: 15,
  },
  subContainer: {
    width: '100%',
    backgroundColor: Colors.PRIMARY,
    height: '70%',
    marginTop: -20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
});
