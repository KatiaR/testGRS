export interface IUser {
	id: string;
	login: string;
}

export interface IUserState {
	data?: IUser[];
	status: 'idle' | 'loading' | 'success' | 'failed';
}

export interface IRepo {
	id: string;
	description?: string;
	login: string;
	name: string;
	stargazers_count?: number;
}

export interface IRepoState {
	data: Array<{ user: string; repos: IRepo[] }>;
	status: 'idle' | 'loading' | 'success' | 'failed';
}
