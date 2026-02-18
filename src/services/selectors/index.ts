import { RootState } from '../store';

export const selectIngredients = (state: RootState) => state.ingredients.items;
export const selectConstructor = (state: RootState) => state.burgerConstructor;
export const selectFeed = (state: RootState) => state.feed;
export const selectProfileOrders = (state: RootState) => state.profileOrders;
export const selectUser = (state: RootState) => state.user;
export const selectOrder = (state: RootState) => state.order;
export const selectOrderDetails = (state: RootState) => state.orderDetails;
