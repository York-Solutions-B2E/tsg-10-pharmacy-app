import RequestAPI from './RequestAPI';
import { validateInventory } from '../util/ValidateAPI';

/**
 * Sends a get request to get all medications from remote server
 * @Returns {Object} HTTP response: {ok: {Boolean}, status: {Integer}, body: {Object}}
 */
export const getAllMedications = async () => {
  return await RequestAPI.getRequest('/api/inventory');
};

/**
 * Sends a put request to update the stock of the provided inventory to the provided quantity
 * @Param {Object} {
 *  id: {Integer},
 *  stockQuantity: {Integer},
 *  sufficientStock: {Integer},
 *  deliveryDate: {dayjs},
 *  medicine: {
 *   id: {Integer},
 *   name: {String},
 *   code: {String}
 *  }
 * }
 * @Param {Integer} updatedQuantity
 * @Returns {Object} HTTP response: {ok: {Boolean}, status: {Integer}, body: {Object}}
 */
export const updateMedicationStock = async (inventory, updatedQuantity) => {
  try {
    validateInventory(inventory);
    if (
      updatedQuantity === null ||
      isNaN(updatedQuantity) ||
      updatedQuantity < 0
    )
      throw new Error('Updated quantity must be a non-negative number');
    return await RequestAPI.putRequest(
      `/api/inventory/${inventory.id}`,
      JSON.stringify({ stockQuantity: updatedQuantity })
    );
  } catch (error) {
    console.error(error);
    return { ok: false, status: 400, body: null };
  }
};

const MedicationAPI = {
  getAllMedications,
  updateMedicationStock,
};
export default MedicationAPI;
