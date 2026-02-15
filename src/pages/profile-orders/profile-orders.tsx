import { FC, useEffect } from 'react';
import { ProfileOrdersUI } from '@ui-pages';
import { Preloader } from '@ui';

import { useDispatch, useSelector } from '../../services/store';
import { fetchProfileOrders } from '@slices';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const { orders, isLoading } = useSelector((state) => state.profileOrders);

  useEffect(() => {
    dispatch(fetchProfileOrders());
    const interval = setInterval(() => {
      dispatch(fetchProfileOrders());
    }, 5000);
    return () => clearInterval(interval);
  }, [dispatch]);

  if (isLoading && !orders.length) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
