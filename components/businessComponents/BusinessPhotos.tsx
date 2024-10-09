import { View, Image, Dimensions, StyleSheet } from 'react-native';
import React from 'react';
import Heading from '../Heading';

const screenWidth = Dimensions.get('window').width;

export default function BusinessPhotos({ image }: { image: string[] }) {
  return (
    <View>
      <Heading>Images</Heading>
      <View style={styles.imageContainer}>
        {image?.map((item, index) => (
          <Image
            loadingIndicatorSource={require('@/assets/images/loading.gif')}
            key={index}
            source={{ uri: item }}
            style={[
              styles.image,
              {
                width:
                  image.length % 2 === 1 && index === image.length - 1
                    ? screenWidth - 45
                    : screenWidth / 2 - 35,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  image: {
    height: 120,
    borderRadius: 15,
    margin: 7,
  },
});
