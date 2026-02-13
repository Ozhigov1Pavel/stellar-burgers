import { FC, ReactElement } from 'react';
import { Location, Navigate, useLocation } from 'react-router-dom';

import { useSelector } from '../services/store';
import { Preloader } from './ui';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  component: ReactElement;
};

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  onlyUnAuth = false,
  component
}) => {
  const { user, isAuthChecked } = useSelector((state) => state.user);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  const state = location.state as { from?: Location };

  if (onlyUnAuth && user) {
    const from = state?.from || { pathname: '/' };
    return <Navigate to={from} replace />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return component;
};
