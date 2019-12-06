import axios from 'axios';
import { APIKEY } from '../api/constants';

const api = axios.create({
  baseURL: 'http://uauapi01.fwc.cloud:22900/uauapi/api/v1.0',
  timeout: 50000,
  headers: {
    'Content-Type': 'application/json',
    'X-INTEGRATION-Authorization': APIKEY,
  },
});

export default api;
