import React from "react";
import { getInitials } from "../../utils/helper";

const ProfileInfo = ({ userInfo, onLogout }) => {
  if (!userInfo || !userInfo.fullName) {
    return null; // or return a fallback UI
  }

  return (
    <div className="flex items-center gap-4 p-2">
      {/* User Avatar with Initials */}
      <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-900 font-semibold bg-indigo-100">
        {getInitials(userInfo?.fullName)}
      </div>

      {/* User Information */}
      <div className="flex flex-col">
        <p className="text-sm font-semibold text-slate-900">{userInfo.fullName}</p>
        <button
          className="text-sm text-indigo-800 hover:text-indigo-800 underline transition-colors"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;

