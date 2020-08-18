import axios from 'axios';

const instance = axios.create({
	baseURL: `https://react-burger-b0a20.firebaseio.com/`,
});

export default instance;
