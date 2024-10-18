import axios from "axios";

/**
 * Fetch user information from the Codeforces API.
 * @param {string} handle - The Codeforces handle.
 * @returns {Promise<object>} - User info object.
 */
const getUserInfo = async (handle) => {
  try {
    const response = await axios.get(
      `https://codeforces.com/api/user.info?handles=${handle}`
    );

    // Return the first result from the response
    return response.data.result[0];
  } catch (error) {
    console.error("Error fetching user info:", error); // Log error for debugging
    throw error; // Rethrow error for handling in calling function
  }
};

/**
 * Fetch the number of submissions made by the user.
 * @param {string} handle - The Codeforces handle.
 * @returns {Promise<number>} - Number of submissions.
 */
const getNumberOfSubmissions = async (handle) => {
  try {
    const response = await axios.get(
      `https://codeforces.com/api/user.status?handle=${handle}`
    );

    // Return the count of submissions
    return response.data.result.length; // Length of the submissions array
  } catch (error) {
    console.error("Error fetching number of submissions:", error); // Log error for debugging
    throw error; // Rethrow error for handling in calling function
  }
};

/**
 * Fetch the total number of contests participated in by the user.
 * @param {string} handle - The Codeforces handle.
 * @returns {Promise<number>} - Number of contests.
 */
const getNumberOfContestsAttended = async (handle) => {
  try {
    const response = await axios.get(
      `https://codeforces.com/api/user.rating?handle=${handle}`
    );

    // Return the count of contests
    return response.data.result.length; // Length of the contests array
  } catch (error) {
    console.error("Error fetching number of contests:", error); // Log error for debugging
    throw error; // Rethrow error for handling in calling function
  }
};

// Exporting functions for use in other modules
export { getNumberOfSubmissions, getNumberOfContestsAttended, getUserInfo };
