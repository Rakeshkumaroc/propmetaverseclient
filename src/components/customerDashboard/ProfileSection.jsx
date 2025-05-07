import React from "react";
import { Verified } from "lucide-react";

const ProfileSection = ({
  user,
  profileForm,
  setUser,
  setProfileForm,
  handleProfileUpdate,
  handleProfileChange,
}) => {
  return (
    <section className="my-8 bg-white shadow rounded p-6">
      <h2 className="text-2xl font-semibold mb-4">Profile</h2>
      {user && (
        <>
          <div className="flex items-center mb-6">
            <img
              src={
                user.profilePic ||
                "https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
              }
              alt="Profile"
              className="w-24 h-24 rounded-full mr-4"
            />
            <div>
              <p className="text-lg font-medium">{user.fullName}</p>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-gray-600">{user.number || "No phone number"}</p>
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-4">Update Profile</h3>
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={profileForm.fullName}
                onChange={handleProfileChange}
                className="w-full p-2 border rounded"
                placeholder="Enter full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <div className="relative flex items-center">
                <input
                  type="email"
                  name="email"
                  value={profileForm.email}
                  onChange={handleProfileChange}
                  className="w-full p-2 border rounded"
                  placeholder="Enter email"
                  disabled={user.isGoogleUser}
                />
                {user.isGoogleUser && (
                  <Verified className="text-logoColor absolute top-1/2 right-2 -translate-y-1/2" />
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium">Phone Number</label>
              <input
                type="tel"
                name="number"
                value={profileForm.number}
                onChange={handleProfileChange}
                className="w-full p-2 border rounded"
                placeholder="Enter phone number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Profile Picture</label>
              <input
                type="file"
                name="profilePic"
                accept="image/*"
                onChange={handleProfileChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <button
              type="submit"
              className="bg-logoColor hover:bg-logoColor/90 text-white px-4 py-2 rounded w-full md:w-auto"
            >
              Update Profile
            </button>
          </form>
        </>
      )}
    </section>
  );
};

export default ProfileSection;