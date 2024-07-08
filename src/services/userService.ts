import axios from 'axios';
import { RandomUser } from '../interfaces/RandomUser';

export const fetchUsers = async (page: number, results: number = 20) => {
    const response = await axios.get<RandomUser>('https://randomuser.me/api/', {
      params: { page, results, seed: 'abc' }
    });
    return response.data;
  };
  
  export const fetchFilteredUsers = async (gender: string, nat: string, results: number = 5) => {
    const response = await axios.get<RandomUser>('https://randomuser.me/api', {
      params: { results, gender, nat}
    });
    return response.data;
  };