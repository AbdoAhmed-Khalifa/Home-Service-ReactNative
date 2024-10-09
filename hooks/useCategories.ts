import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllCategories } from '@/utils/firebase';

export default function useCategories() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategories,
  });

  return { categories: data?.categories, isLoading, error };
}
