import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { isConditionalExpression } from 'typescript';
import { getRepositories, Repo } from '../api/repository';
import { RootState } from '../app/store';

export interface IRepoState {
	data: Array<{ user: string; repos: Repo[] }>;
	status: 'idle' | 'loading' | 'success' | 'failed';
}

const initialState: IRepoState = {
	data: [],
	status: 'idle',
};

export const getReposAsync = createAsyncThunk(
	'repo/fetchRepos',
	async (search: string) => {
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
			state.data = [];
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getReposAsync.pending, (state) => {
				state.status = 'loading';
				return state;
			})
			.addCase(getReposAsync.fulfilled, (state, action) => {
				state.status = 'success';
				action.payload && state.data?.push(action.payload);
			});
	},
});

export const { clearData } = reposSlice.actions;
export const selectReposData = (state: RootState) => state.repos.data;
export const selectReposStatus = (state: RootState) => state.repos.status;

export default reposSlice.reducer;
