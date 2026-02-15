import { FC, SyntheticEvent, useState } from 'react';
import { Location, useLocation, useNavigate } from 'react-router-dom';
import { LoginUI } from '@ui-pages';

import { useDispatch, useSelector } from '../../services/store';
import { loginUser } from '@slices';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { authError } = useSelector((state) => state.user);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const state = location.state as { from?: Location };
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => {
        const from = state?.from?.pathname || '/';
        navigate(from, { replace: true });
      })
      .catch(() => {});
  };

  return (
    <LoginUI
      errorText={authError || ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
