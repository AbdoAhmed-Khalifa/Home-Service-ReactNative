import SignInWithOAuth from '@/components/SignInWithOAuth';
import { SignedOut } from '@clerk/clerk-expo';
import { SignedIn } from '@clerk/clerk-react';
import { Tabs } from 'expo-router';
import React from 'react';
import SignIn from '../(auth)/sign-in';
import { Text } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '@/constants/Colors';
export default function Layout() {
  return (
    <>
      <SignedIn>
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: Colors.PRIMARY,
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              tabBarLabel: ({ color }) => (
                <Text style={{ color, fontSize: 12, marginTop: -7 }}>Home</Text>
              ),
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="home" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="bookings"
            options={{
              tabBarLabel: ({ color }) => (
                <Text style={{ color, fontSize: 12, marginTop: -7 }}>
                  Bookings
                </Text>
              ),
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="bookmark" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              tabBarLabel: ({ color }) => (
                <Text style={{ color, fontSize: 12, marginTop: -7 }}>
                  Profile
                </Text>
              ),
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="user-circle" size={size} color={color} />
              ),
            }}
          />
        </Tabs>
      </SignedIn>
      <SignedOut>
        <SignIn />
      </SignedOut>
    </>
  );
}
