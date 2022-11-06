import axios from 'axios';
import { baseURL } from '../constant/url';

const publicFetch = axios.create({
	baseURL: baseURL,
	withCredentials: true,
	credentials: 'include',
	headers: {
		'Access-Control-Allow-Origin': '*',
		'Content-Type': 'application/json',
	},
});

export default publicFetch;
