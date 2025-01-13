import { getAllOrders } from '../../API/OrdersAPI';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllOrders = createAsyncThunk(
  'orders/getAllOrders',
  async () => {
    const response = await axios.post('http://localhost:8080/api/orders/');
    
    // getAllOrders();

    console.log('orders async thunk. response is:', response);

    // JSON.parse(response.body);

    return response;
    // return JSON.parse(response.body);
  }
);
