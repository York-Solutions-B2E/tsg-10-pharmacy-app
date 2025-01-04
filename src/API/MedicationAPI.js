import RequestAPI from './RequestAPI';

export const getAllMedications = async () => {
  return await RequestAPI.getRequest('/api/inventory');
};
