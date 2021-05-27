import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import usersReducer from '../slicer/usersSlice';
import reposReducer from '../slicer/reposSlice';

export const store = configureStore({
	reducer: {
		users: usersReducer,
		repos: reposReducer,
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
