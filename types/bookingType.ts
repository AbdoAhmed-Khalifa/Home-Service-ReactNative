import { ImageType } from './businessListType';

export type BookingType = {
  business: {
    id: string;
    name: string;
    images: string[];
    contactPerson: string;
    address: string;
  };
  date: string;
  time: string;
  bookingStatus: string;
};
