import React, { useState } from "react";
import { Link } from "react-router-dom";

interface UserProfile {
  name: string;
  email: string;
  bio: string;
}

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>({
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1>Profile Page</h1>
      <form>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Bio:
          <textarea name="bio" value={profile.bio} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Save</button>
        <Link to="/admin">Admin Page</Link>
      </form>
    </div>
  );
};

export default ProfilePage;
