import { rootReducer } from './root-reducer';
import {
  constructorReducer,
  feedReducer,
  ingredientsReducer,
  orderDetailsReducer,
  orderReducer,
  profileOrdersReducer,
  userReducer
} from './slices';

describe('rootReducer', () => {
  it('initializes correctly', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN' });
    expect(state).toEqual({
      ingredients: ingredientsReducer(undefined, { type: 'UNKNOWN' }),
      burgerConstructor: constructorReducer(undefined, { type: 'UNKNOWN' }),
      order: orderReducer(undefined, { type: 'UNKNOWN' }),
      feed: feedReducer(undefined, { type: 'UNKNOWN' }),
      profileOrders: profileOrdersReducer(undefined, { type: 'UNKNOWN' }),
      user: userReducer(undefined, { type: 'UNKNOWN' }),
      orderDetails: orderDetailsReducer(undefined, { type: 'UNKNOWN' })
    });
  });
});
