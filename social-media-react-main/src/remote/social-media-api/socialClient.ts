import axios from 'axios';

// This is the configuration for sending HTTP Requests with Axios
// Very simple, but it also doesn't give us much abstraction
const socialClient = axios.create({
  withCredentials: true,
  baseURL: 'http://project3-env.eba-sgpkascp.us-west-2.elasticbeanstalk.com',
  //baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://Capstoneproject3-env.eba-64ejyxdp.us-east-1.elasticbeanstalk.com',
  },
});

export interface socialApiResponse {
  status: number;
  payload: any;
}

export default socialClient;