import RequestAPI from './RequestAPI';

/**
 * Sends a get request to get all medications from remote server
 * @Returns {Object} HTTP response: {ok: boolean, status: int, body: String}
 */
export const getAllMedications = async () => {
  return await RequestAPI.getRequest('/api/inventory');
};

/**
 * Sends a put request to update the stock of the provided inventory to the provided quantity
 * @Param {Object} inventory
 * @Param {Integer} updatedQuantity
 * @Returns {Object} HTTP response: {ok: boolean, status: int, body: String}
 */
export const updateMedicationStock = async (inventory, updatedQuantity) => {
  try {
    if (inventory === undefined) throw new Error('No inventory provided');
    if (inventory === null) throw new Error('Provided inventory is null');
    if (inventory.id === null || isNaN(inventory.id) || inventory.id <= 0)
      throw new Error('Inventory id must be a positive number');
    if (
      updatedQuantity === null ||
      isNaN(updatedQuantity) ||
      updatedQuantity < 0
    )
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

/**
 * Sends a put request to adjust the stock of the provided inventory by the provided quantity
 * @Param {Object} inventory
 * @Param {Integer} stockAdjustment
 * @Returns {Object} HTTP response: {ok: boolean, status: int, body: String}
 */
export const adjustMedicationStock = async (inventory, stockAdjustment) => {
  try {
    if (inventory === undefined) throw new Error('No inventory provided');
    if (inventory === null) throw new Error('Provided inventory is null');
    if (inventory.id === null || isNaN(inventory.id) || inventory.id <= 0)
      throw new Error('Inventory id must be a positive number');
    if (stockAdjustment === null || isNaN(stockAdjustment))
      throw new Error('Stock adjustment must be a number');
    if (stockAdjustment === 0) return { ok: true, status: 200, body: null };
    return await RequestAPI.putRequest(
      `/api/inventory/${inventory.id}/adjust-stock/${stockAdjustment}`
    );
  } catch (error) {
    console.error(error);
    return { ok: false, status: 400, body: null };
  }
};
