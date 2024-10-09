import { View, Text, Image, StyleSheet, TextInput } from 'react-native';
import React from 'react';
import { useUser } from '@clerk/clerk-expo';
import Colors from '@/constants/Colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
export default function Header() {
  const { user, isLoaded } = useUser();
  return (
    user && (
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <View style={styles.profileContainer}>
            <Image source={{ uri: user?.imageUrl }} style={styles.userImage} />
            <View>
              <Text
                style={{ color: Colors.WHITE, fontFamily: 'Outfit-Regular' }}
              >
                Welcome,{' '}
              </Text>
              <Text
                style={{
                  color: Colors.WHITE,
                  fontSize: 20,
                  fontFamily: 'Outfit-Medium',
                }}
              >
                {user?.fullName}
              </Text>
            </View>
          </View>
          <FontAwesome name="bookmark-o" size={27} color="white" />
        </View>
        <View style={styles.searchBarContainer}>
          <TextInput style={styles.textInput} placeholder="Search..." />
          <FontAwesome
            style={styles.searchIcon}
            name="search"
            size={24}
            color={Colors.PRIMARY}
          />
        </View>
      </View>
    )
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: Colors.PRIMARY,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  userImage: {
    width: 45,
    height: 45,
    borderRadius: 999,
  },
  searchBarContainer: {
    flexDirection: 'row',
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: 10,
  },
  textInput: {
    backgroundColor: Colors.WHITE,
    padding: 7,
    borderRadius: 10,
    width: '85%',
    paddingHorizontal: 16,
    fontFamily: 'Outfit-Regular',
  },
  searchIcon: {
    backgroundColor: Colors.WHITE,
    padding: 7,
    borderRadius: 8,
  },
});
