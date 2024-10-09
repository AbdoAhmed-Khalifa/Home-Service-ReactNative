import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { StatusBar } from 'expo-status-bar';
import useBusiness from '@/hooks/useBusiness';
import BusinessInfo from '@/components/businessComponents/businessInfo';
import { BusinessListType } from '@/types/businessListType';
import BusinessButtons from '@/components/businessComponents/businessButtons';

export default function BusinessDetails() {
  const { id } = useLocalSearchParams();
  const { business, isLoading } = useBusiness(id as string);
  return (
    <>
      {isLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 40,
          }}
        >
          <ActivityIndicator size="large" color={Colors.PRIMARY} />
        </View>
      ) : (
        <View>
          <StatusBar style="dark" />
          <ScrollView style={{ height: '91%' }}>
            {/* Back Button */}
            <TouchableOpacity
              style={{ position: 'absolute', top: 30, left: 20, zIndex: 10 }}
              onPress={() => {
                router.back();
              }}
            >
              <Ionicons
                name="arrow-back-outline"
                size={30}
                color={Colors.PRIMARY}
              />
            </TouchableOpacity>
            <Image
              loadingIndicatorSource={require('@/assets/images/loading.gif')}
              source={{ uri: business?.images[0] }}
              style={{ width: '100%', height: 300 }}
            />
            <BusinessInfo business={business as BusinessListType} />
          </ScrollView>
          <BusinessButtons businessId={business?.id as string} />
        </View>
      )}
    </>
  );
}
