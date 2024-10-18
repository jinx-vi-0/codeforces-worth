import React from "react";

// UserStats component to display user's competitive statistics
const UserStats = ({ rating, rank, contestCount }) => (
  <div className="user-records flex max-sm:flex-col justify-around mt-10 max-sm:text-base">
    {/* Current Elo Rating */}
    <div className="rating text-xl font-bold font-mono flex flex-col items-center max-sm:text-base mx-1">
      <span className="text-xl text-black">Current Elo</span>
      {/* Display rating, default to "0" if not available */}
      <span>{rating === "" ? "0" : rating}</span>
    </div>
    
    {/* Divider between stats */}
    <div className="border-l border-gray-400"></div>
    
    {/* User's Title */}
    <div className="rank text-xl font-bold flex font-mono flex-col items-center max-sm:text-base mx-1">
      <span className="text-xl text-black">Title</span>
      {/* Display rank/title of the user */}
      <span>{rank}</span>
    </div>
    
    {/* Divider between stats */}
    <div className="border-l border-gray-400"></div>
    
    {/* Number of contests participated in */}
    <div className="no-of-contests text-xl font-bold flex font-mono flex-col items-center max-sm:text-base mx-1">
      <span className="text-lg text-black">Contests</span>
      {/* Display count of contests */}
      <span>{contestCount}</span>
    </div>
  </div>
);

export default UserStats;
