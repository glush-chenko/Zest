import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import themeReducer from "../theme/theme-provider/theme-provider-slice"
import leftSectionReducer from "../features/main/left-section/left-section-slice"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    themeSlice: themeReducer,
    leftSectionSlice: leftSectionReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
