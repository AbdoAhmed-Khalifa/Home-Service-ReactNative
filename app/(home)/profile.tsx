import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import React from 'react';
import { useAuth, useUser } from '@clerk/clerk-expo';
import Colors from '@/constants/Colors';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
export default function profile() {
  const { user } = useUser();
  const { signOut } = useAuth();

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: Colors.PRIMARY,
          padding: 20,
          paddingTop: 50,
        }}
      >
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}
          onPress={() => {
            router.back();
          }}
        >
          <Ionicons name="arrow-back-outline" size={30} color="white" />
          <Text
            style={{
              fontSize: 25,
              fontFamily: 'Outfit-Medium',
              color: 'white',
            }}
          >
            Your Profile
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginTop: 20,
          padding: 20,
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Image
            source={{ uri: user?.imageUrl }}
            style={{ width: 150, height: 150, borderRadius: 20 }}
          />
          <TouchableOpacity
            onPress={() => signOut()}
            style={{ flexDirection: 'row', gap: 10 }}
          >
            <Text style={{ fontFamily: 'Outfit-Medium', fontSize: 20 }}>
              Log out
            </Text>
            <Ionicons name="log-out" size={30} color="black" />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 40, gap: 10 }}>
          <View>
            <Text
              style={{
                fontFamily: 'Outfit-Bold',
                fontSize: 16,
                marginTop: 8,
              }}
            >
              Full Name:
            </Text>
            <Text
              style={{
                fontFamily: 'Outfit-Medium',
                fontSize: 16,
                marginTop: 8,
                paddingLeft: 10,
              }}
            >
              {user?.fullName}
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontFamily: 'Outfit-Bold',
                fontSize: 16,
                marginTop: 8,
              }}
            >
              Email:
            </Text>
            <Text
              style={{
                fontFamily: 'Outfit-Medium',
                fontSize: 16,
                marginTop: 8,
                paddingLeft: 10,
              }}
            >
              {user?.primaryEmailAddress?.emailAddress}
            </Text>
          </View>

          <View>
            <Text
              style={{
                fontFamily: 'Outfit-Bold',
                fontSize: 16,
                marginTop: 8,
              }}
            >
              Last SignIn:
            </Text>
            <Text
              style={{
                fontFamily: 'Outfit-Medium',
                fontSize: 16,
                marginTop: 8,
                paddingLeft: 10,
              }}
            >
              {user?.lastSignInAt?.toDateString()} at{'   '}
              <Text style={{ color: Colors.GRAY }}>
                {user?.lastSignInAt?.getHours()}:
                {user?.lastSignInAt?.getMinutes()}:
                {user?.lastSignInAt?.getSeconds()}
              </Text>
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20,
          position: 'absolute',
          bottom: 0,
          width: '100%',
        }}
      >
        <Text style={{ fontFamily: 'Outfit-Bold', fontSize: 18 }}>
          Contact us
        </Text>
        <View
          style={{
            flexDirection: 'row',
            gap: 15,
            alignItems: 'center',
            marginTop: 10,
          }}
        >
          <Ionicons
            onPress={() => {
              Linking.openURL(
                'https://www.facebook.com/profile.php?id=100004235130641'
              );
            }}
            name="logo-facebook"
            size={30}
            color="#4267B2"
          />
          <Ionicons
            onPress={() => {
              Linking.openURL(
                'https://www.linkedin.com/in/abdelrahman-ahmed-khalifa/'
              );
            }}
            name="logo-linkedin"
            size={30}
            color="#0A66C2"
          />
          <MaterialIcons
            onPress={() => {
              Linking.openURL('mailto:abdelrahmanahmedkhalifa99@gmail.com');
            }}
            name="email"
            size={30}
            color="#BB001B"
          />
          <Ionicons
            onPress={() => {
              Linking.openURL('https://wa.me/+201065058121');
            }}
            name="logo-whatsapp"
            size={30}
            color="#25D366"
          />
        </View>
      </View>
    </View>
  );
}
