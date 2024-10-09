import { createNewBooking } from '@/utils/firebase';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { ToastAndroid } from 'react-native';

export default function useAddBooking() {
  const queryClient = useQueryClient();

  const { mutate: createBooking, isPending } = useMutation({
    mutationFn: createNewBooking,
    onSuccess: () => {
      ToastAndroid.show('Booking created successfully', ToastAndroid.LONG);
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
    onError: error => {
      ToastAndroid.show('Error creating booking:', ToastAndroid.LONG);
    },
  });
  return { createBooking, isPending };
}
