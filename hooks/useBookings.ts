import { getUserBookingHistory } from '@/utils/firebase';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
export default function useBookings(email: string) {
  const { data, isLoading } = useQuery({
    queryKey: ['bookings', email],
    queryFn: () => getUserBookingHistory(email),
  });
  return { bookings: data, isLoading };
}
