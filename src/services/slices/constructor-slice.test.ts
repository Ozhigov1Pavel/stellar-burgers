import {
  addIngredient,
  clearConstructor,
  constructorReducer,
  moveIngredient,
  removeIngredient
} from './constructor-slice';
import { TConstructorIngredient, TIngredient } from '@utils-types';

const bun: TIngredient = {
  _id: 'bun-1',
  name: 'Булка',
  type: 'bun',
  proteins: 10,
  fat: 5,
  carbohydrates: 20,
  calories: 200,
  price: 100,
  image: '',
  image_large: '',
  image_mobile: ''
};

const main: TIngredient = {
  _id: 'main-1',
  name: 'Начинка',
  type: 'main',
  proteins: 10,
  fat: 5,
  carbohydrates: 20,
  calories: 200,
  price: 50,
  image: '',
  image_large: '',
  image_mobile: ''
};

describe('burgerConstructor reducer', () => {
  it('adds bun ingredient', () => {
    const state = constructorReducer(undefined, addIngredient(bun));
    expect(state.bun?._id).toBe('bun-1');
  });

  it('adds filling ingredient with id', () => {
    const state = constructorReducer(undefined, addIngredient(main));
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]._id).toBe('main-1');
    expect(state.ingredients[0].id).toBeDefined();
  });

  it('removes ingredient by id', () => {
    const ingredientWithId: TConstructorIngredient = {
      ...main,
      id: 'unique-1'
    };
    const initialState = {
      bun: null,
      ingredients: [ingredientWithId]
    };
    const state = constructorReducer(
      initialState,
      removeIngredient('unique-1')
    );
    expect(state.ingredients).toHaveLength(0);
  });

  it('moves ingredient within fillings', () => {
    const ing1: TConstructorIngredient = { ...main, id: '1' };
    const ing2: TConstructorIngredient = { ...main, id: '2', _id: 'main-2' };
    const ing3: TConstructorIngredient = { ...main, id: '3', _id: 'main-3' };
    const initialState = {
      bun: null,
      ingredients: [ing1, ing2, ing3]
    };
    const state = constructorReducer(
      initialState,
      moveIngredient({ from: 0, to: 2 })
    );
    expect(state.ingredients[2].id).toBe('1');
  });

  it('clears constructor', () => {
    const initialState = {
      bun: bun,
      ingredients: [{ ...main, id: '1' }]
    };
    const state = constructorReducer(initialState, clearConstructor());
    expect(state.bun).toBeNull();
    expect(state.ingredients).toHaveLength(0);
  });
});
