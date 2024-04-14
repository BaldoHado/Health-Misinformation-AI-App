import React, { useState } from "react";
import styles from "./SignUp.module.scss";
import { Link } from "react-router-dom";

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
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
  };

  return (
    <div className={styles.centering}>
      <div className={styles.signupcontainer}>
        <h2 className={styles.centering}>Sign Up</h2>
        <form className={styles.signupform} onSubmit={handleSubmit}>
          <div className={styles.formgroup}>
            <label htmlFor="firstName">First Name</label>
            <input
              className={styles.textnow}
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formgroup}>
            <label htmlFor="lastName">Last Name</label>
            <input
              className={styles.textnow}
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formgroup}>
            <label htmlFor="email">Email</label>
            <input
              className={styles.textnow}
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formgroup}>
            <label htmlFor="pass">Password</label>
            <input
              className={styles.textnow}
              type="password"
              id="pass"
              name="pass"
              value={formData.pass}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formgroup}>
            <label htmlFor="tokenRegisteredWith">Access Key</label>
            <input
              className={styles.textnow}
              type="text"
              id="tokenRegisteredWith"
              name="tokenRegisteredWith"
              value={formData.tokenRegisteredWith}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formgroup}>
            <Link to="/signin">
              <button type="submit">Sign Up</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
