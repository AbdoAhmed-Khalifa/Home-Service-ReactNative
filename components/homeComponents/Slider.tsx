import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import Heading from '../Heading';
import Colors from '@/constants/Colors';
import useSlider from '@/hooks/useSlider';

export default function Slider() {
  const { sliderData, isLoading } = useSlider();
  return (
    <View>
      <Heading>Offer For You</Heading>
      {!isLoading ? (
        <FlatList
          data={sliderData}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={{ marginHorizontal: 10 }}>
              <Image
                source={{ uri: item.imageUrl }}
                style={styles.sliderImage}
              />
            </View>
          )}
        />
      ) : (
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
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  sliderImage: {
    width: 300,
    height: 150,
    objectFit: 'fill',
    borderRadius: 20,
  },
});
