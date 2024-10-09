import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { BusinessListType } from '@/types/businessListType';
import BusinessPhotos from './BusinessPhotos';
import Colors from '@/constants/Colors';
import Heading from '../Heading';
import { Ionicons } from '@expo/vector-icons';

export default function BusinessInfo({
  business,
}: {
  business: BusinessListType;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.infoContainer}>
      <Text style={styles.businessName}>{business?.name}</Text>

      <View style={styles.rowContainer}>
        <Text style={styles.contactPerson}>{business?.contactPerson}</Text>
        <Text style={styles.categoryBadge}>{business?.category.name}</Text>
      </View>

      <Text style={styles.addressText}>
        <Ionicons name="location" size={20} color={Colors.PRIMARY} />
        {business?.address}
      </Text>

      <View style={styles.divider}></View>

      <View>
        <Heading>About Me</Heading>

        <Text numberOfLines={expanded ? undefined : 4} style={styles.aboutText}>
          {business?.about}
        </Text>

        <TouchableOpacity
          onPress={() => setExpanded(!expanded)}
          style={styles.readMoreButton}
        >
          <Text style={styles.readMoreText}>
            {expanded ? 'Read Less' : 'Read More'}
          </Text>
        </TouchableOpacity>

        <View style={styles.divider}></View>
        <BusinessPhotos image={business?.images as string[]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  infoContainer: {
    padding: 20,
    gap: 7,
  },
  businessName: {
    fontFamily: 'Outfit-Bold',
    fontSize: 25,
  },
  rowContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  contactPerson: {
    fontSize: 20,
    fontFamily: 'Outfit-Medium',
    color: Colors.PRIMARY,
  },
  categoryBadge: {
    backgroundColor: Colors.PRIMARY_LIGHT,
    color: Colors.PRIMARY,
    padding: 5,
    borderRadius: 7,
    fontSize: 14,
  },
  addressText: {
    fontSize: 17,
    fontFamily: 'Outfit-Regular',
    color: Colors.GRAY,
  },
  divider: {
    borderWidth: 0.4,
    marginVertical: 20,
    borderColor: Colors.GRAY,
  },
  aboutText: {
    fontSize: 16,
    fontFamily: 'Outfit-Regular',
    color: Colors.GRAY,
    lineHeight: 25,
  },
  readMoreButton: {
    marginTop: 10,
  },
  readMoreText: {
    color: Colors.PRIMARY,
    fontWeight: 'bold',
  },
});
