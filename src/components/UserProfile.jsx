import React from "react";
import { SiCodeforces } from "react-icons/si";

// UserProfile component to display user information
const UserProfile = ({ userData, maxRating }) => (
  <div className="profile flex justify-center">
    <div className="flex items-center w-full justify-between max-sm:flex-col max-sm:items-start">
      {/* Left side: Profile picture and user details */}
      <div className="flex items-center">
        <div className="rounded-full overflow-hidden">
          {/* Profile picture */}
          <img
            src={userData.titlePhoto || ""} // Use default if no image is provided
            alt="profile-pic"
            className="rounded-full w-28 h-28 max-sm:w-20 max-sm:h-20 mx-4 my-4"
          />
        </div>
        <div className="about my-4 mx-4 max-sm:mx-0">
          {/* User's full name */}
          <div className="full-name text-xl max-sm:text-base font-bold">
            {userData.firstName} {userData.lastName}
          </div>
          {/* User handle */}
          <div className="handle text-xl text-black rounded-lg bg-gray-200 px-2 py-1 inline-block mt-3">
            {userData.handle}
          </div>
        </div>
      </div>
      {/* Right side: Codeforces icon and max rating */}
      <div className="right-flex flex flex-col justify-center items-center max-sm:mt-4">
        <SiCodeforces className="text-8xl max-sm:text-3xl" />
        <div className="maxRating text-lg flex flex-col items-center max-sm:text-base mx-1 mr-4">
          {/* Displaying max rating */}
          <span className="text-xl text-black font-bold">Max Elo</span>
          <span className="text-xl text-black font-bold">{maxRating}</span>
        </div>
      </div>
    </div>
  </div>
);

export default UserProfile;
