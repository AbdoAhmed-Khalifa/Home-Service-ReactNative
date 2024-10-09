import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

export default function Heading({
  children,
  isViewAll = false,
}: {
  children: React.ReactNode;
  isViewAll?: boolean;
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{children}</Text>
      {isViewAll && <Text>View All</Text>}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: 20,
    fontFamily: 'Outfit-Medium',
    marginBottom: 10,
  },
});
