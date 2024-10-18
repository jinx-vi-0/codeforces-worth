import React, { useRef, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { SiCodeforces } from "react-icons/si";
import codeforcesWorthCalculator from "../worthCalculator/codeforcesWorthCalculator.js";
import fetchUserData from "../codeforcesAPI/codeforcesService.js";
import LoadingComponent from "./LoadingComponent.jsx";
import firestore from "../firebase/firebaseConfig.js";
import { doc, setDoc, collection, getDoc } from "@firebase/firestore";
import UserProfile from "../components/UserProfile.jsx";
import UserStats from "../components/UserStats";

function CodeforcesWorth() {
  // State variables to manage user data and loading state
  const [userData, setUserData] = useState({});
  const [worth, setWorth] = useState(0);
  const [contestCount, setContestCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [rating, setRating] = useState(0);
  const [rank, setRank] = useState("N/A");
  const [maxRating, setMaxRating] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  // Reference for scrolling or DOM manipulation if needed
  const ref = useRef(null);

  // Firestore collection reference for users
  const userCollectionRef = collection(firestore, "users");

  // Handle form submission to fetch user data
  const onSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setLoading(true); // Set loading state to true while fetching data

    try {
      // Get the user handle from the form input
      const handle = e.target[0].value;
      // Fetch user data and contest information from the API
      const { userInfo, contests } = await fetchUserData(handle);
      setContestCount(contests); // Set contest count state

      // Calculate the worth of the user based on the handle
      const calculatedWorth = await codeforcesWorthCalculator(handle);
      setWorth(calculatedWorth); // Update worth state

      // Extract relevant user information
      const { rating: userRating, rank: userRank, maxRating: userMaxRating } = userInfo;
      setRating(userRating || 0); // Default to 0 if no rating is available
      setRank(userRank || "N/A"); // Default to "N/A" if no rank is available
      setMaxRating(userMaxRating || 0); // Default to 0 if no max rating is available
      setUserData(userInfo); // Update user data state
      setShowCard(true); // Show the user profile card
      setErrorMessage(""); // Clear any previous error messages

      // Prepare the user document for Firestore
      const userDoc = {
        userRating,
        userRank,
        userWorth: calculatedWorth,
      };

      // Reference to the user's document in Firestore
      const userDocRef = doc(userCollectionRef, handle);
      // Check if the document exists, and update or create it accordingly
      getDoc(userDocRef)
        .then((docSnapshot) => {
          if (docSnapshot.exists()) {
            return setDoc(userDocRef, userDoc, { merge: true }); // Merge if exists
          } else {
            return setDoc(userDocRef, userDoc); // Create if it does not exist
          }
        })
        .catch((error) => {
          console.error("Error writing or updating document: ", error); // Log Firestore errors
        });
    } catch (error) {
      console.error("Error fetching user info:", error);
      setShowCard(false); // Hide card on error
      setErrorMessage("Invalid Handle");

      // Clear error message after 2 seconds
      setTimeout(() => {
        setErrorMessage("");
      }, 2000);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="heading text-6xl font-bold max-sm:text-2xl mb-3">
        <h1 style={{ fontFamily: "Comic Sans MS" }}>
          <span>Codeforces</span> <span>Worth</span>
        </h1>
      </div>
      <div className="mt-2">
        <p style={{ color: "#666", fontFamily: "monaco, monospace" }}>
          See how much your Codeforces worth
        </p>
      </div>
      <form onSubmit={onSubmit} className="flex flex-col items-center mb-6">
        <div className="flex items-center border-2 border-gray-280 rounded-xl p-2 m-5 bg-transparent text-black w-full sm:w-96 text-lg max-sm:text-lg mx-2 sm:mx-0">
          <span className="mr-2 p-3 m-2 text-black font-bold">
            <SiCodeforces style={{ fontSize: "24px" }} />
          </span>
          <input
            type="text"
            placeholder="handle"
            className="flex-grow bg-transparent border-none outline-none text-black text-lg max-sm:text-lg"
            required
          />
          <button
            type="submit"
            className="items-center justify-center w-fit rounded-full p-3 m-2 bg-black text-white text-center text-lg font-bold gap-2"
          >
            <FaArrowRight />
          </button>
        </div>
      </form>
      {errorMessage && <div className="text-red-500">{errorMessage}</div>} {/* Display error message if exists */}
      {loading ? (
        <LoadingComponent /> // Show loading component while fetching data
      ) : (
        showCard && (
          <div
            id="codeforces"
            ref={ref}
            className="codeforces-worth w-auto md:w-[40%] h-auto md:h-fit mb-2"
          >
            <UserProfile userData={userData} maxRating={maxRating} />
            <UserStats rating={rating} rank={rank} contestCount={contestCount} />
            <div className="total-worth my-6">
              <div className="text-3xl font-bold text-center mt-2">
                $ {worth} {" 💰 "}
              </div>
              <div className="text-lg font-normal text-center mt-2 font-mono">
                Estimated Worth
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default CodeforcesWorth;
