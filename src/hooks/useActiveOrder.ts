
'use client';

import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, Unsubscribe } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/context/AuthContext';
import type { Order } from '@/types/order';

const useActiveOrder = () => {
  const [hasActiveOrder, setHasActiveOrder] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setHasActiveOrder(false);
      setLoading(false);
      return;
    }

    let unsubscribe: Unsubscribe | undefined;

    try {
      const ordersRef = collection(db, 'orders');
      // We assume phone number is used to identify the user's orders,
      // as full user auth might not be implemented on the customer side yet.
      // This can be changed to user.uid if a full login system is in place.
      const q = query(
        ordersRef,
        where('phoneNumber', '==', user.phoneNumber),
        where('orderStatus', 'in', ['Pending', 'Preparing'])
      );

      unsubscribe = onSnapshot(q, (querySnapshot) => {
        setHasActiveOrder(!querySnapshot.empty);
        setLoading(false);
      }, (error) => {
        console.error("Error listening to active orders: ", error);
        setHasActiveOrder(false);
        setLoading(false);
      });

    } catch (error) {
        console.error("Error setting up Firestore listener: ", error);
        setHasActiveOrder(false);
        setLoading(false);
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user]);

  return { hasActiveOrder, loading };
};

export default useActiveOrder;
