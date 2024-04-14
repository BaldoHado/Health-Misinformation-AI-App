import React, { useState } from "react";
import styles from "./SignUp.module.scss";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  pass: string;
  tokenRegisteredWith: string;
}

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    pass: "",
    tokenRegisteredWith: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="pass">Password</label>
          <input
            type="password"
            id="pass"
            name="pass"
            value={formData.pass}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="tokenRegisteredWith">Access Key</label>
          <input
            type="text"
            id="tokenRegisteredWith"
            name="tokenRegisteredWith"
            value={formData.tokenRegisteredWith}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
