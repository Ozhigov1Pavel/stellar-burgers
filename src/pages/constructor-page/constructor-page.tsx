import { FC } from 'react';
import { ConstructorPageUI } from '@ui-pages';

import { useSelector } from '../../services/store';

export const ConstructorPage: FC = () => {
  const isIngredientsLoading = useSelector(
    (state) => state.ingredients.isLoading
  );

  return <ConstructorPageUI isIngredientsLoading={isIngredientsLoading} />;
};
