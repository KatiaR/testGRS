import axios from 'axios';
import { IUser } from '../interfaces/interfaces';

export const getUsers = async (value: string) => {
	const resultLimit = 5;
	try {
		const response = await axios.get<{ items: IUser[] }>(
			`https://api.github.com/search/users?q=${value} in:login&per_page=${resultLimit}`
		);
		return response.data.items;
	} catch (error) {
		console.log(error);
	}
	return [];
};
