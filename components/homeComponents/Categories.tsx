import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import Heading from '../Heading';
import Colors from '@/constants/Colors';
import { Link } from 'expo-router';
import useCategories from '@/hooks/useCategories';

export default function Categories() {
  const { categories, isLoading } = useCategories();
  return (
    <View style={{ marginTop: 10 }}>
      <Heading>Categories</Heading>
      {isLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 50,
          }}
        >
          <ActivityIndicator size="large" color={Colors.PRIMARY} />
        </View>
      ) : (
        <FlatList
          data={categories}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Link href={`/category/${item.name}`} style={styles.container}>
              <View>
                <View style={styles.iconContainer}>
                  <Image
                    source={{ uri: item.icon }}
                    style={{ width: 30, height: 30 }}
                  />
                </View>
                <Text style={{ fontFamily: 'Outfit-Medium', marginTop: 5 }}>
                  {item.name}
                </Text>
              </View>
            </Link>
          )}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  iconContainer: {
    backgroundColor: Colors.LIGHT_GRAY,
    padding: 17,
    borderRadius: 99,
  },
});
