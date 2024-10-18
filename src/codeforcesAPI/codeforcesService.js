import { getUserInfo, getNumberOfContestsAttended } from "./codeforces-api.js";

// Function to fetch user data based on Codeforces handle
const fetchUserData = async (handle) => {
  // Fetch user information from the API
  const userInfo = await getUserInfo(handle);
  
  // Check if userInfo was successfully retrieved; throw an error if not
  if (!userInfo) throw new Error("Invalid Handle");

  // Fetch the number of contests the user has attended
  const contests = await getNumberOfContestsAttended(handle);

  // Return an object containing user info and contest count
  return { userInfo, contests };
};

export default fetchUserData;
