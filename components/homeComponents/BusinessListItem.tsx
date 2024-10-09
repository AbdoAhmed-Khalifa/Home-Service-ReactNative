import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { BusinessListType } from '@/types/businessListType';
import Colors from '@/constants/Colors';
import { router } from 'expo-router';

export default function BusinessListItem({
  business,
}: {
  business: BusinessListType;
}) {
  return (
    <Pressable
      onPress={() => router.push(`/businessDetails/${business.id}`)}
      style={styles.container}
    >
      <Image style={styles.image} source={{ uri: business.images[0] }} />
      <View style={styles.infoContainer}>
        <Text style={{ fontSize: 17, fontFamily: 'Outfit-Medium' }}>
          {business.name}
        </Text>
        <Text
          style={{
            fontSize: 13,
            fontFamily: 'Outfit-Regular',
            color: Colors.GRAY,
          }}
        >
          {business.contactPerson}
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
          {business.category.name}
        </Text>
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
  },
  infoContainer: {
    padding: 7,
    gap: 3,
  },
  image: {
    width: 190,
    height: 100,
    borderRadius: 10,
  },
});
