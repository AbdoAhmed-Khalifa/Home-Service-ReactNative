import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getBusinessByCategory } from '@/utils/firebase';

export default function useCategory(cat: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['category', cat],
    queryFn: () => getBusinessByCategory(cat),
  });

  return { category: data, isLoading, error };
}
