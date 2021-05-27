import axios from 'axios';
import { IRepo } from '../interfaces/interfaces';

export const getRepositories = async (user: string) => {
	const resultLimit = 5;
	try {
		const response = await axios.get<IRepo[]>(
			`https://api.github.com/users/${user}/repos?per_page=${resultLimit}`
		);
		return { user, repos: response.data };
	} catch (error) {
		console.log(error);
	}
	return;
};
