import React from "react";

const Chats = () => {
  return (
    <div className="flex items-center justify-between p-2 border-2 border-gray-400 rounded-full hover:border-purple-700  cursor-pointer">
      <div className="flex items-center gap-3">
        <img
          src="https://www.das-macht-schule.net/wp-content/uploads/2018/04/dummy-profile-pic.png"
          alt=""
          width={40}
          className="rounded-full"
        />
        <div className="leading-4">
          <h1 className="font-medium text-gray-300">Batman Vi</h1>
          <p className="text-sm text-purple-100">hey! there</p>
        </div>
      </div>
      <div className="leading-4 flex flex-col items-center">
        <p className="text-sm text-white">11:35</p>
        <span className="text-sm bg-purple-700 rounded-full font-medium text-white px-2">5</span>
      </div>
    </div>
  );
};

export default Chats;
