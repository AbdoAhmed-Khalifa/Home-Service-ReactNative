import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Colors from '@/constants/Colors';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';
export default function BookingItem({
  business,
  status,
  date,
  time,
}: {
  business: {
    id: string;
    name: string;
    images: string[];
    contactPerson: string;
    address: string;
  };
  status: string;
  date: string;
  time: string;
}) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => router.push(`/businessDetails/${business.id}`)}
    >
      <Image style={styles.image} source={{ uri: business.images[0] }} />
      <View style={{ gap: 7 }}>
        <Text
          style={{
            fontSize: 15,
            fontFamily: 'Outfit-Regular',
            color: Colors.GRAY,
          }}
        >
          {business.contactPerson}
        </Text>
        <Text
          style={{
            fontSize: 17,
            fontFamily: 'Outfit-Medium',
          }}
        >
          {business.name}
        </Text>
        <Text
          style={{
            fontSize: 10,
            fontFamily: 'Outfit-Regular',
            padding: 5,
            color: Colors.PRIMARY,
            backgroundColor: Colors.PRIMARY_LIGHT,
            borderRadius: 3,
            alignSelf: 'flex-start',
          }}
        >
          {status}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
          <AntDesign name="calendar" size={17} color={Colors.PRIMARY} />
          <Text
            style={{
              fontSize: 12,
              fontFamily: 'Outfit-Regular',
              color: Colors.GRAY,
            }}
          >
            {date}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
          <AntDesign name="clockcircleo" size={17} color={Colors.PRIMARY} />
          <Text
            style={{
              fontSize: 12,
              fontFamily: 'Outfit-Regular',
              color: Colors.GRAY,
            }}
          >
            {time}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 15,
    marginBottom: 15,
    backgroundColor: Colors.WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  image: {
    width: 135,
    height: 135,
    borderRadius: 15,
  },
});
