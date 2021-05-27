import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers, User } from '../api/users';
import { RootState } from '../app/store';

export interface IUserState {
	data?: User[];
	status: 'idle' | 'loading' | 'success' | 'failed';
}

const initialState: IUserState = {
	data: undefined,
	status: 'idle',
};

export const getUsersAsync = createAsyncThunk(
	'user/fetchUser',
	async (search: string) => {
		const response = await getUsers(search);
		return response;
	}
);

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		clearData: (state) => {
			state.status = 'idle';
			state.data = undefined;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getUsersAsync.pending, (state) => {
				state.status = 'loading';
				state.data = undefined;
			})
			.addCase(getUsersAsync.fulfilled, (state, action) => {
				state.status = 'success';
				state.data = action.payload;
			});
	},
});

export const { clearData } = userSlice.actions;
export const selectData = (state: RootState) => state.users.data;
export const selectStatus = (state: RootState) => state.users.status;

export default userSlice.reducer;
