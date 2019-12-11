import api from '../services/api';

export async function getAllProtucts() {
  let response = null;
  try {
    response = await api.post('RotinasGerais/ExecutarConsultaGeral', {
      Id: '4',
      Personalizado: '1',
    });
  } catch (error) {
    throw error;
  }
  return response.data;
}
