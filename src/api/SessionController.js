import axios from '../utils/axios';
import APIKEY from './constants';

export const getAuth = async (login, password) => {
  let response = null;
  try {
    response = await axios.post(
      'Autenticador/AutenticarUsuarioApp',
      {
        login,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-INTEGRATION-Authorization': APIKEY,
        },
      }
    );
  } catch (error) {
    throw error;
  }

  return {
    login: response.data[0].Usuario[1].Login_usr,
    name: response.data[0].Usuario[1].Nome_usr,
    token: response.data[0].Usuario[1].token,
  };
};
