import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getSlider } from '@/utils/firebase';

export default function useSlider() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['slider'],
    queryFn: getSlider,
  });
  return { sliderData: data, isLoading, error };
}
