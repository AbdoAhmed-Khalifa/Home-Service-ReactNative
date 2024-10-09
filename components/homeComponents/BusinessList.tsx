import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import Heading from '../Heading';
import BusinessListItem from './BusinessListItem';
import Colors from '@/constants/Colors';
import useBusinessList from '@/hooks/useBusinessList';

export default function BusinessList() {
  const { businessList, isLoading } = useBusinessList();
  return (
    <View style={{ marginTop: 10 }}>
      <Heading isViewAll>Latest Business</Heading>
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
          horizontal
          showsHorizontalScrollIndicator={false}
          data={businessList?.slice(0, 4)}
          renderItem={({ item }) => (
            <View style={{ marginHorizontal: 5 }}>
              <BusinessListItem business={item} />
            </View>
          )}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
}
