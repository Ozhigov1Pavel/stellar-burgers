import { fetchIngredients, ingredientsReducer } from './ingredients-slice';
import { TIngredient } from '@utils-types';

const ingredient: TIngredient = {
  _id: 'id-1',
  name: 'Ingredient',
  type: 'main',
  proteins: 10,
  fat: 5,
  carbohydrates: 20,
  calories: 200,
  price: 100,
  image: '',
  image_large: '',
  image_mobile: ''
};

describe('ingredients reducer', () => {
  it('sets loading on pending', () => {
    const state = ingredientsReducer(
      undefined,
      fetchIngredients.pending('', undefined)
    );
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('stores data on fulfilled', () => {
    const state = ingredientsReducer(
      undefined,
      fetchIngredients.fulfilled([ingredient], '', undefined)
    );
    expect(state.items).toEqual([ingredient]);
    expect(state.isLoading).toBe(false);
  });

  it('stores error on rejected', () => {
    const state = ingredientsReducer(
      undefined,
      fetchIngredients.rejected(new Error('fail'), '', undefined, 'fail')
    );
    expect(state.error).toBe('fail');
    expect(state.isLoading).toBe(false);
  });
});
