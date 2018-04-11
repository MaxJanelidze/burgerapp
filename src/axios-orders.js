import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://my-burger-62f5b.firebaseio.com/'
});

export default instance;