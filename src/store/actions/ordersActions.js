import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const GET_ALL_ORDERS = gql`
the query to get all orders
`;

export const getAllOrders = createAsyncThunk(
  'orders/getAllOrders',
  async (args, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8080/api/graphql', {
        GET_ALL_ORDERS,
      });
      return response.data;
    } catch (error) {
      // console.error('Error in getting orders list:', error);
      if (error.response) {
        // Server responded with a status code outside the 2xx range

        return rejectWithValue({
          status: error.response.status,
          body: error.response.data?.message, // Contains error response from the server
        });
      }
    }

    // Server didn't respond
    return rejectWithValue({
      status: 500,
      body: 'Server did not respond', // No response from the server
    });
  }
);
