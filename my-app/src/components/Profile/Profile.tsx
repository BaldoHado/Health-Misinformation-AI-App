import React, { useState } from "react";
import styles from "./Profile.module.scss";

interface UserProfile {
  name: string;
  email: string;
  password: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
}

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors: FormErrors = {};

    if (!profile.name) {
      errors.name = "Name is required";
    }

    if (!profile.email) {
      errors.email = "Email is required";
    } else {
      const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
      if (!emailRegex.test(profile.email)) {
        errors.email = "Invalid email format";
      }
    }

    if (!profile.password) {
      errors.password = "Password is required";
    }

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const response = await fetch("/api/profile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(profile),
        });

        if (response.ok) {
          console.log("Profile saved successfully");
        } else {
          console.error("Failed to save profile");
        }
      } catch (error) {
        console.error("Error saving profile:", error);
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Profile Page</h1>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="First and Last Name"
              value={profile.name}
              onChange={handleChange}
              className={styles.input}
            />
            {formErrors.name && (
              <div className={styles.error}>{formErrors.name}</div>
            )}
          </div>
          <div className={styles.formGroup}>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={profile.email}
              onChange={handleChange}
              className={styles.input}
            />
            {formErrors.email && (
              <div className={styles.error}>{formErrors.email}</div>
            )}
          </div>
          <div className={styles.formGroup}>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={profile.password}
              onChange={handleChange}
              className={styles.input}
            />
            {formErrors.password && (
              <div className={styles.error}>{formErrors.password}</div>
            )}
          </div>
          <button type="submit" className={styles.button}>
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
