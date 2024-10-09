import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  ToastAndroid,
} from 'react-native';
import React, { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import CalendarPicker from 'react-native-calendar-picker';
import Heading from '@/components/Heading';
import { getTime } from '@/utils/helper';
import { StatusBar } from 'expo-status-bar';
import useAddBooking from '@/hooks/useAddBooking';
import { useUser } from '@clerk/clerk-expo';
import { format } from 'date-fns';

export default function BusinessBook() {
  const { id } = useLocalSearchParams();
  const { createBooking, isPending } = useAddBooking();
  const [selectedTime, setSelectedTime] = useState<string>();
  const [selectedDate, setSelectedDate] = useState<string>();
  const [suggestionNote, setSuggestionNote] = useState<string>();
  const { user } = useUser();
  const timeList = getTime();

  function onConfirmBooking() {
    if (!selectedDate || !selectedTime) {
      ToastAndroid.show('Please select date and time', ToastAndroid.LONG);
      return;
    }
    createBooking({
      userName: user?.fullName as string,
      userEmail: user?.primaryEmailAddress?.emailAddress as string,
      businessId: id as string,
      date: format(new Date(selectedDate), 'dd/MMM/yyyy'),
      time: selectedTime,
    });
    router.back();
  }

  return (
    <ScrollView>
      <StatusBar style="dark" />
      <KeyboardAvoidingView style={{ padding: 20 }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            paddingTop: 20,
            paddingBottom: 10,
          }}
          onPress={() => {
            router.back();
          }}
        >
          <Ionicons name="arrow-back-outline" size={30} color={Colors.BLACK} />
          <Text
            style={{
              fontSize: 25,
              fontFamily: 'Outfit-Medium',
              color: Colors.BLACK,
            }}
          >
            Booking
          </Text>
        </TouchableOpacity>
        <View style={{ alignItems: 'center' }}>
          <Heading>Select Date</Heading>
        </View>
        <View style={styles.calendarContainer}>
          <CalendarPicker
            onDateChange={setSelectedDate}
            width={350}
            minDate={Date.now()}
            todayBackgroundColor={Colors.BLACK}
            todayTextStyle={{ color: Colors.WHITE }}
            selectedDayColor={Colors.PRIMARY}
            selectedDayTextColor={Colors.WHITE}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <View style={{ alignItems: 'center' }}>
            <Heading>Select Time</Heading>
          </View>
          <FlatList
            data={timeList}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.time}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => setSelectedTime(item.time)}>
                <Text
                  style={
                    selectedTime === item.time
                      ? styles.selectedTime
                      : styles.unSelectedTime
                  }
                >
                  {item.time}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <Heading>Any Suggestion</Heading>
          <TextInput
            onChangeText={setSuggestionNote}
            multiline
            numberOfLines={4}
            placeholder="write here"
            style={styles.textArea}
          />
        </View>
        <TouchableOpacity
          onPress={onConfirmBooking}
          style={{ marginTop: 20 }}
          activeOpacity={0.7}
        >
          <Text style={styles.confirmBtn}>Confirm & Book</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  calendarContainer: {
    backgroundColor: Colors.PRIMARY_LIGHT,
    padding: 20,
    borderRadius: 15,
  },
  selectedTime: {
    borderWidth: 1,
    padding: 8,
    borderColor: Colors.PRIMARY,
    backgroundColor: Colors.PRIMARY,
    color: Colors.WHITE,
    borderRadius: 99,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  unSelectedTime: {
    borderWidth: 1,
    padding: 8,
    borderColor: Colors.PRIMARY,
    color: Colors.PRIMARY,
    borderRadius: 99,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  textArea: {
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 10,
    padding: 20,
    fontSize: 16,
    textAlignVertical: 'top',
    fontFamily: 'Outfit-Regular',
  },
  confirmBtn: {
    backgroundColor: Colors.PRIMARY,
    color: Colors.WHITE,
    textAlign: 'center',
    fontSize: 17,
    fontFamily: 'Outfit-Medium',
    borderRadius: 99,
    padding: 10,
    elevation: 2,
  },
});
