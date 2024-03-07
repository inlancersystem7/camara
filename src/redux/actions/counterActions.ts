// src/redux/actions/counterActions.ts
import { INCREMENT, DECREMENT } from './types';

export const increment = () => ({
  type: INCREMENT,
});

export const decrement = () => ({
  type: DECREMENT,
});
