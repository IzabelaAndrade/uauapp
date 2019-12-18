import api from '../services/api';

export async function getAllPlaces() {
  let response = null;
  try {
    response = await api.post('Obras/ObterObrasAtivas');
  } catch (error) {
    throw error;
  }
  return response.data;
}
