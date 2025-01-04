import RequestAPI from './RequestAPI';

export const getAllMedications = async () => {
  return await RequestAPI.getRequest('/api/inventory');
};

export const updateMedicationStock = async (inventory, updatedQuantity) => {
  try {
    if (inventory === undefined) throw new Error('No inventory provided');
    if (inventory === null) throw new Error('Provided inventory is null');
    if (isNaN(inventory.id))
      throw new Error('Inventory id must be a positive number');
    if (isNaN(updatedQuantity))
      throw new Error('Updated quantity must be a non-negative number');
    return await RequestAPI.putRequest(
      `/api/inventory/${inventory.id}`,
      JSON.stringify({ ...inventory, stockQuantity: updatedQuantity })
    );
  } catch (error) {
    console.error(error);
    return { ok: false, status: 400, body: null };
  }
};
