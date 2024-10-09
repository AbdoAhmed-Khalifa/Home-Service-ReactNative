import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import useBookings from '@/hooks/useBookings';
import { useUser } from '@clerk/clerk-expo';
import BookingItem from '@/components/bookingsComponents/bookingItem';

export default function bookings() {
  const { user } = useUser();
  const { bookings, isLoading } = useBookings(
    user?.primaryEmailAddress?.emailAddress as string
  );

  return (
    <View style={{ flex: 1, paddingBottom: 110 }}>
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
            My Bookings
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ paddingHorizontal: 20 }}>
        {isLoading ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: Dimensions.get('window').height / 2 - 50,
            }}
          >
            <ActivityIndicator size="large" color={Colors.PRIMARY} />
          </View>
        ) : bookings!.length > 0 ? (
          <FlatList
            style={{ marginTop: 30 }}
            data={bookings}
            renderItem={({ item }) => (
              <BookingItem
                business={item.business}
                date={item.date}
                status={item.bookingStatus}
                time={item.time}
              />
            )}
          />
        ) : (
          <View
            style={{
              marginTop: Dimensions.get('window').height / 2 - 100,
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'Outfit-Medium',
                fontSize: 20,
              }}
            >
              No business booked yet, please go to home and book a business
            </Text>
            <TouchableOpacity onPress={() => router.push('/')}>
              <Text
                style={{
                  color: Colors.PRIMARY,
                  borderColor: Colors.PRIMARY,
                  borderWidth: 1,
                  padding: 8,
                  paddingHorizontal: 20,
                  marginTop: 10,
                  borderRadius: 99,
                  fontFamily: 'Outfit-Medium',
                  fontSize: 20,
                }}
              >
                Home
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}
