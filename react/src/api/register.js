import instance from './axios';

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @param {string} userData.email - User email address
 * @param {string} userData.password - User password (minimum 8 characters)
 * @param {string} userData.first_name - User first name
 * @param {string} userData.last_name - User last name
 * @returns {Promise} Response with user data and success message
 */
export const registerUser = async (userData) => {
  const response = await instance.post('/api/register/', {
    email: userData.email,
    password: userData.password,
    first_name: userData.first_name,
    last_name: userData.last_name,
  });
  return response.data;
};

export default registerUser;
