import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllBusinessList } from '@/utils/firebase';
import { BusinessListsType } from '@/types/businessListsType';

export default function useBusinessList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['businessList'],
    queryFn: getAllBusinessList,
  });

  return { businessList: data as BusinessListsType, isLoading, error };
}
