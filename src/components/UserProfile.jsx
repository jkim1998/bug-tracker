import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineCancel } from "react-icons/md";

import { Button } from ".";
import { userProfileData } from "../data/importData";
import { useAuth } from "../contexts/AuthContext";
import { useStateContext } from "../contexts/ContextProvider";
import avatar from "../data/avatar.jpg";
import user_default from "../data/user_default.png";

const UserProfile = () => {
  const { currentColor } = useStateContext();
  const { logout, user } = useAuth();

  const handleSignOut = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };
  const addDefaultSrc = (e) => {
    e.target.src = avatar; // this could be an imported image or url
  };

  return (
    <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">Profile</p>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <img
          className="rounded-full h-24 w-24 border-2"
          src={user ? user.photoURL : user_default}
          // src={avatar}
          alt={avatar}
        />
        <div>
          <p className="font-semibold text-xl dark:text-gray-200">
            {user ? user.displayName : <p>Name</p>}
          </p>
          <p className="text-gray-500 text-sm dark:text-gray-400">
            {user ? user.title : <p>title</p>}
          </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">
            {user ? user.email : <p>email</p>}
          </p>
        </div>
      </div>
      <div>
        {userProfileData.map((item, index) => (
          <a href={item.link}>
            <div
              key={index}
              className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]"
            >
              <button
                type="button"
                style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                className=" text-xl rounded-lg p-3 hover:bg-light-gray"
              >
                {item.icon}
              </button>

              <div>
                <p className="font-semibold dark:text-gray-200 ">
                  {item.title}
                </p>
                <p className="text-gray-500 text-sm dark:text-gray-400">
                  {item.desc}
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>
      <div className="mt-5">
        <button
          className="bg-green-400 text-white p-3 rounded-xl hover:opacity-80"
          onClick={() => handleSignOut()}
        >
          sign out
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
