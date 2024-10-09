import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  DocumentReference,
  getDoc,
  doc,
  addDoc,
  serverTimestamp,
  query,
  where,
} from 'firebase/firestore';
import { GraphCategoriesType } from '../types/graphCategoriesType';
import { BusinessListsType } from '../types/businessListsType';
import { BusinessListType } from '../types/businessListType';
import { BookingType } from '../types/bookingType';

const firebaseConfig = {
  apiKey: 'AIzaSyDcbx1Dh5_6xdrqkbjLfK4QNheWm72_MAI',
  authDomain: 'doctor-booking-b4966.firebaseapp.com',
  projectId: 'doctor-booking-b4966',
  storageBucket: 'doctor-booking-b4966.appspot.com',
  messagingSenderId: '410853786069',
  appId: '1:410853786069:web:45e826d5a4a0355e113d5c',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getAllCategories(): Promise<GraphCategoriesType> {
  const categories: GraphCategoriesType['categories'] = [];
  const querySnapshot = await getDocs(collection(db, 'Category'));

  querySnapshot.forEach(doc => {
    categories.push({
      id: doc.id,
      ...(doc.data() as Omit<GraphCategoriesType['categories'][0], 'id'>),
    });
  });

  return { categories };
}

async function getSlider(): Promise<SliderItem[]> {
  const slider: SliderItem[] = [];
  const querySnapshot = await getDocs(collection(db, 'Slider'));

  querySnapshot.forEach(doc => {
    const data = doc.data() as Omit<SliderItem, 'id'>;
    slider.push({
      id: doc.id,
      ...data,
    });
  });
  return slider;
}

async function getAllBusinessList(): Promise<BusinessListsType> {
  const businessLists: BusinessListsType = [];
  const querySnapshot = await getDocs(collection(db, 'Business List'));

  for (const doc of querySnapshot.docs) {
    const data = doc.data();
    let categoryName = '';

    // Fetch category data if it exists
    if (data.category && data.category instanceof DocumentReference) {
      const categoryDoc = await getDoc(data.category);
      if (categoryDoc.exists()) {
        categoryName = categoryDoc.data().name || '';
      }
    }

    businessLists.push({
      id: doc.id,
      about: data.about,
      address: data.address,
      contactPerson: data.contactPerson,
      email: data.email,
      images: data.images,
      name: data.name,
      category: {
        name: categoryName,
      },
    });
  }

  return businessLists;
}

async function getBusinessByCategory(
  category: string
): Promise<BusinessListsType> {
  const businessLists: BusinessListsType = [];
  const querySnapshot = await getDocs(collection(db, 'Business List'));

  for (const doc of querySnapshot.docs) {
    const data = doc.data();

    if (data.category && data.category instanceof DocumentReference) {
      const categoryDoc = await getDoc(data.category);
      if (categoryDoc.exists() && categoryDoc.data().name === category) {
        businessLists.push({
          id: doc.id,
          about: data.about,
          address: data.address,
          contactPerson: data.contactPerson,
          email: data.email,
          name: data.name,
          category: {
            name: category,
          },
          images: data.images,
        });
      }
    }
  }

  return businessLists;
}
async function getBusinessById(businessId: string): Promise<BusinessListType> {
  const docRef = doc(db, 'Business List', businessId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    let categoryName = '';

    // Fetch category data if it exists
    if (data.category && data.category instanceof DocumentReference) {
      const categoryDoc = await getDoc(data.category);
      if (categoryDoc.exists()) {
        categoryName = categoryDoc.data().name || '';
      }
    }

    return {
      id: docSnap.id,
      about: data.about,
      address: data.address,
      category: {
        name: categoryName,
      },
      contactPerson: data.contactPerson,
      email: data.email,
      name: data.name,
      images: data.images,
    };
  } else {
    throw new Error('Business not found');
  }
}

async function createNewBooking({
  businessId,
  date,
  time,
  userEmail,
  userName,
}: {
  businessId: string;
  date: string;
  time: string;
  userEmail: string;
  userName: string;
}): Promise<string> {
  try {
    const bookingRef = await addDoc(collection(db, 'Bookings'), {
      businessId,
      date,
      time,
      userEmail,
      userName,
      bookingStatus: 'Booked',
      createdAt: serverTimestamp(),
    });

    return bookingRef.id;
  } catch (error) {
    console.error('Firestore error:', error);
    throw new Error('Failed to create booking');
  }
}

async function getBookedBusiness(
  businessId: string,
  date: string
): Promise<{ date: string; time: string }[]> {
  const bookingsRef = collection(db, 'Bookings');
  const q = query(
    bookingsRef,
    where('businessId', '==', businessId),
    where('date', '==', date)
  );

  const querySnapshot = await getDocs(q);
  const bookings: { date: string; time: string }[] = [];

  querySnapshot.forEach(doc => {
    const data = doc.data();
    bookings.push({
      date: data.date,
      time: data.time,
    });
  });

  return bookings;
}

async function getUserBookingHistory(email: string): Promise<BookingType[]> {
  const bookingsRef = collection(db, 'Bookings');
  const q = query(bookingsRef, where('userEmail', '==', email));
  const querySnapshot = await getDocs(q);

  const bookings: BookingType[] = [];

  for (const bookingDoc of querySnapshot.docs) {
    const bookingData = bookingDoc.data();
    const businessDocRef = doc(db, 'Business List', bookingData.businessId);
    const businessDoc = await getDoc(businessDocRef);
    const businessData = businessDoc.data();

    if (businessData) {
      bookings.push({
        business: {
          id: bookingData.businessId,
          name: businessData.name,
          images: businessData.images,
          contactPerson: businessData.contactPerson,
          address: businessData.address,
        },
        date: bookingData.date,
        time: bookingData.time,
        bookingStatus: bookingData.bookingStatus,
      });
    }
  }

  return bookings;
}

export {
  getAllCategories,
  getAllBusinessList,
  getBusinessByCategory,
  getBusinessById,
  createNewBooking,
  getBookedBusiness,
  getUserBookingHistory,
  getSlider,
};
