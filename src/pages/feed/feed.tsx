import { FC, useEffect } from 'react';
import { FeedUI } from '@ui-pages';
import { Preloader } from '@ui';

import { useDispatch, useSelector } from '../../services/store';
import { fetchFeeds } from '@slices';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const { orders, isLoading } = useSelector((state) => state.feed);
  const FEED_POLL_MS = 5000;

  useEffect(() => {
    dispatch(fetchFeeds());
    const interval = setInterval(() => {
      dispatch(fetchFeeds());
    }, FEED_POLL_MS);
    return () => clearInterval(interval);
  }, [dispatch]);

  if (isLoading && !orders.length) {
    return <Preloader />;
  }
  return (
    <FeedUI orders={orders} handleGetFeeds={() => dispatch(fetchFeeds())} />
  );
};
