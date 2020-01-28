// import axios from 'axios';
// import { APIKEY } from '../controller/constants';

// const api = axios.create({
//   baseURL: 'http://uauapi01.fwc.cloud:22900/uauapi/api/v1.0',
//   timeout: 50000,
//   headers: {
//     'Content-Type': 'application/json',
//     'X-INTEGRATION-Authorization': APIKEY,
//   },
// });

// export default api;

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.14:3333/',
  timeout: 50000,
});

export default api;
