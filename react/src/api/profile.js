import instance from './axios';

/**
 * Get user profile
 * @param {string} token - Authorization token
 * @returns {Promise} Response with user profile data
 */
export const getProfile = async (token) => {
  const response = await instance.get('/api/profile/', {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return response.data;
};

export default getProfile;
