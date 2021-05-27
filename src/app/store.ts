import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import usersReducer from '../features/search/usersSlice';
import reposReducer from '../features/search/reposSlice';

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
