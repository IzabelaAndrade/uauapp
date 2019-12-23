import api from '../services/api';

export async function getAllPlaces(user) {
  let response = null;
  try {
    response = await api.post('RotinasGerais/ExecutarConsultaGeral', {
      Id: '9',
      Personalizado: '1',
      Parameters: ['user', "'".concat(user, "'")],
    });
  } catch (error) {
    throw error;
  }
  return response;
}
