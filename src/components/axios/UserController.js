import axios from 'axios';

export const getUsers = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/auth/users"); // Correct endpoint
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

export const deleteUser = async (userId) => {
  try {
    await axios.delete(`http://localhost:8080/api/auth/users/${userId}`);
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};

export const updateUser = async (userId, user) => {
  try {
    await axios.put(`http://localhost:8080/api/auth/users/${userId}`, user);
  } catch (error) {
    console.error('Error updating user:', error);
  }
};
