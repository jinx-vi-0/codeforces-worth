import {
  getNumberOfContestsAttended,
  getNumberOfSubmissions,
  getUserInfo,
} from "../codeforcesAPI/codeforces-api.js";

// Mapping of Codeforces ranks to their associated worth values
const rankWorthMapping = {
  "newbie": 2.0,
  "pupil": 4.0,
  "specialist": 8.0,
  "expert": 16.0,
  "candidate master": 32.0,
  "master": 64.0,
  "international master": 128.0,
  "international grandmaster": 256.0,
  "grandmaster": 512.0,
  "legendary grandmaster": 1024.0,
};

/**
 * Calculate the total worth of a Codeforces user based on various metrics.
 * @param {string} handle - The Codeforces handle.
 * @returns {Promise<number>} - The calculated worth of the user.
 */
const calculateCodeforcesWorth = async (handle) => {
  try {
    // Fetch user information from Codeforces API
    const userInfo = await getUserInfo(handle);
    
    // Fetch the number of contests attended and submissions made by the user
    const contestsAttendedCount = await getNumberOfContestsAttended(handle);
    const submissionsCount = await getNumberOfSubmissions(handle);

    // Calculate different worth metrics based on user data
    const rankWorth = userInfo.rating * (rankWorthMapping[userInfo.rank] || 0);
    const contributionWorth = userInfo.contribution ? userInfo.contribution * 18 : 0; // Ensure contribution is valid
    const maxRating = userInfo.maxRating || 0; // Default to 0 if maxRating is not available
    const contestsWorth = contestsAttendedCount * 12; // Value assigned per contest attended
    const submissionsWorth = submissionsCount * 6; // Value assigned per submission made

    // Sum up all worth metrics to calculate total worth
    let totalWorth = 
      rankWorth + 
      contributionWorth + 
      maxRating + 
      submissionsWorth + 
      contestsWorth;

    // Format total worth to one decimal place
    totalWorth = (totalWorth / 100).toFixed(1);
    
    // Ensure the return value is a number
    return parseFloat(totalWorth); 
  } catch (error) {
    console.error("Error calculating worth:", error); // Log any errors encountered
    throw error; // Rethrow the error for handling in calling function
  }
};

export default calculateCodeforcesWorth;
