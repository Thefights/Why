import axios from "axios";

const API_BASE_URL = "http://localhost:5209/api"; // Replace with your actual API base URL

// Fetch users from the API
export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/productmanagement`);
    console.log(response.data);
    return response; // This will include the response data, status, and other information
  } catch (error) {
    // Handle or throw the error as needed
    console.error("Error fetching products:", error);
    throw error;
  }
};

// // Create a new user in the API
// export const createUser = async (user) => {
//   try {
//     const response = await axios.post(`${API_BASE_URL}/users`, user);
//     return response; // This will include the response data, status, and other information
//   } catch (error) {
//     // Handle or throw the error as needed
//     console.error("Error creating user:", error);
//     throw error;
//   }
// };

// Other API service methods...
