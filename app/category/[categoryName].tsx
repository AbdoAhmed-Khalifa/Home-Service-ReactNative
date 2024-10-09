import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { getBusinessByCategory } from '@/utils/firebase';
import { BusinessListType } from '@/types/businessListType';
import Ionicons from '@expo/vector-icons/Ionicons';
import BusinessListItem from '@/components/categoryComponents/BusinessListItem';
import Colors from '@/constants/Colors';
import useCategory from '@/hooks/useCategory';
export default function CategoryList() {
  const { categoryName } = useLocalSearchParams();
  const { category, isLoading } = useCategory(categoryName as string);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#eeeeee',
      }}
    >
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
            {categoryName}
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
        ) : (
          <FlatList
            style={{ marginTop: 30 }}
            data={category}
            renderItem={({ item }) => <BusinessListItem business={item} />}
          />
        )}
      </View>
    </View>
  );
}
