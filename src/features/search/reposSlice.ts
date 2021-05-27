import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getRepositories, Repo } from '../../api/repository';
import { RootState } from '../../app/store';

export interface IRepoState {
	data?: Repo[];
	status: 'idle' | 'loading' | 'success' | 'failed';
}

const initialState: IRepoState = {
	data: undefined,
	status: 'idle',
};

export const getReposAsync = createAsyncThunk(
	'repo/fetchRepos',
	async (search: string[]) => {
		const response = await getRepositories(search);
		return response;
	}
);

export const reposSlice = createSlice({
	name: 'repo',
	initialState,
	reducers: {
		clearData: (state) => {
			state.status = 'idle';
			state.data = undefined;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getReposAsync.pending, (state) => {
				state.status = 'loading';
				state.data = undefined;
			})
			.addCase(getReposAsync.fulfilled, (state, action) => {
				state.status = 'success';
				state.data = action.payload;
			});
	},
});

export const { clearData } = reposSlice.actions;
export const selectData = (state: RootState) => state.repos.data;
export const selectStatus = (state: RootState) => state.repos.status;

export default reposSlice.reducer;
