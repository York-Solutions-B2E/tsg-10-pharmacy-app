import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllActivePrescriptions = createAsyncThunk(
  'prescriptions/getAllActivePrescriptions',
  async () => {
    const response = await axios.get(
      'http://localhost:8080/api/prescriptions/active'
    );

    console.log('prescriptions async thunk. response is: ', response);

    return response;
  }
);
