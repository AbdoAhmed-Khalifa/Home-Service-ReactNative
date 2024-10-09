import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { BusinessListType } from '@/types/businessListType';
import Colors from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useNavigation } from 'expo-router';
export default function BusinessListItem({
  business,
}: {
  business: BusinessListType;
}) {
  return (
    <TouchableOpacity
      onPress={() => router.push(`/businessDetails/${business.id}`)}
      style={styles.container}
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
            fontSize: 12,
            fontFamily: 'Outfit-Regular',
            color: Colors.GRAY,
            gap: 3,
          }}
        >
          <Ionicons name="location" size={15} color={Colors.PRIMARY} />
          {business.address}
        </Text>
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
    width: 100,
    height: 100,
    borderRadius: 15,
  },
});
