import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import Colors from '@/constants/Colors';
import { router } from 'expo-router';

export default function BusinessButtons({
  businessId,
}: {
  businessId: string;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginHorizontal: 20,
        marginVertical: 8,
        gap: 8,
      }}
    >
      <TouchableOpacity style={styles.messageBtn}>
        <Text
          style={{
            color: Colors.PRIMARY,
            fontFamily: 'Outfit-Medium',
            fontSize: 18,
            textAlign: 'center',
          }}
        >
          Message
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.bookingBtn}
        onPress={() => router.push(`/businessBook/${businessId}`)}
      >
        <Text
          style={{
            color: Colors.WHITE,
            fontFamily: 'Outfit-Medium',
            fontSize: 18,
            textAlign: 'center',
          }}
        >
          Book Now
        </Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  messageBtn: {
    padding: 10,
    backgroundColor: Colors.WHITE,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    flex: 1,
  },
  bookingBtn: {
    padding: 10,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 99,
    flex: 1,
  },
});
