import instance from './axios';

/**
 * Login user
 * @param {Object} credentials - User login credentials
 * @param {string} credentials.email - User email address
 * @param {string} credentials.password - User password
 * @returns {Promise} Response with token and user data
 */
export const loginUser = async (credentials) => {
  const response = await instance.post('/api/login/', {
    email: credentials.email,
    password: credentials.password,
  });
  return response.data;
};

export default loginUser;
