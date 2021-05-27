import axios, { AxiosResponse } from 'axios';

export interface Repo {
	description?: string;
	login: string;
	name: string;
	stargazers_count?: number;
}

export const getRepositories = async (user: string[]) => {
	const resultLimit = 5;
	try {
		const response = await axios.get<Repo[]>(
			`https://api.github.com/users/${user[0]}/repos?per_page=${resultLimit}`
		);
		console.log('repositories', response.data);
		return response.data;
	} catch (error) {
		console.log(error);
	}
	return [];
};
