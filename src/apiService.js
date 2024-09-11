import axios from 'axios';

const API_BASE_URL = '{{host}}/core/subscription';
const AUTH_TOKEN = '{{access_token}}';

axios.defaults.headers.common['Authorization'] = `Bearer ${AUTH_TOKEN}`;

export const getPlans = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching plans:', error);
    throw error;
  }
};

export const addUserSubscription = async (subscriptionData) => {
  try {
    const response = await axios.post(API_BASE_URL, subscriptionData);
    return response.data;
  } catch (error) {
    console.error('Error adding user subscription:', error);
    throw error;
  }
};
