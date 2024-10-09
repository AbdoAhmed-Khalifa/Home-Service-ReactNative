import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getBusinessById } from '@/utils/firebase';

export default function useBusiness(id: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['business', id],
    queryFn: () => getBusinessById(id),
  });

  return { business: data, isLoading, error };
}
