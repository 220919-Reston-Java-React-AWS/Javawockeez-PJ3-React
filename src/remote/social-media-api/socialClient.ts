import axios from 'axios';

// This is the configuration for sending HTTP Requests with Axios
// Very simple, but it also doesn't give us much abstraction
const socialClient = axios.create({
  withCredentials: true,
  // baseURL: 'http://220919javawockeezcapstonebackend-env.eba-gtdtyrfr.us-east-1.elasticbeanstalk.com/',
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
    // 'Access-Control-Allow-Origin': 'http://220919javawockeezcapstonebackend-env.eba-gtdtyrfr.us-east-1.elasticbeanstalk.com/:8080',
    'Access-Control-Allow-Origin': 'http://localhost:8080',
  },
});

export interface socialApiResponse {
  status: number;
  payload: any;
}

export default socialClient;