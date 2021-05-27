import axios, { AxiosResponse } from 'axios';

export interface Repo {
	id: string;
	description?: string;
	login: string;
	name: string;
	stargazers_count?: number;
}

export const getRepositories = async (user: string) => {
	const resultLimit = 5;
	try {
		const response = await axios.get<Repo[]>(
			`https://api.github.com/users/${user}/repos?per_page=${resultLimit}`
		);
		return { user, repos: response.data };
	} catch (error) {
		console.log(error);
	}
	return;
};
