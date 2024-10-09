import BusinessList from '@/components/homeComponents/BusinessList';
import Categories from '@/components/homeComponents/Categories';
import Header from '@/components/homeComponents/Header';
import Slider from '@/components/homeComponents/Slider';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, View } from 'react-native';

export default function Page() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="light" />
      <Header />
      <ScrollView>
        <View style={{ padding: 20 }}>
          <Slider />
          <Categories />
          <BusinessList />
        </View>
      </ScrollView>
    </View>
  );
}
