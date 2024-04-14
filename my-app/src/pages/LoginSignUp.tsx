import React, { useState, useEffect } from "react";
import "./App.css";
import { Amplify } from "aws-amplify";
import { awsExports } from "./aws-exports";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Auth } from "aws-amplify";

// Configure AWS Amplify
Amplify.configure({
  Auth: {
    region: awsExports.REGION,
    userPoolId: awsExports.USER_POOL_ID,
    userPoolWebClientId: awsExports.USER_POOL_APP_CLIENT_ID,
  },
});

function App(): JSX.Element {
  const [jwtToken, setJwtToken] = useState<string>("");

  useEffect(() => {
    fetchJwtToken();
  }, []);

  const fetchJwtToken = async (): Promise<void> => {
    try {
      const session = await Auth.currentSession();
      const token = session.getIdToken().getJwtToken();
      setJwtToken(token);
    } catch (error) {
      console.log("Error fetching JWT token:", error);
    }
  };

  return (
    <Authenticator
      initialState="signIn"
      components={{
        SignUp: {
          FormFields: () => (
            <>
              <Authenticator.SignUp.FormFields />

              {/* Custom fields for given_name and family_name */}
              <div>
                <label>First name</label>
              </div>
              <input
                type="text"
                name="given_name"
                placeholder="Please enter your first name"
              />
              <div>
                <label>Last name</label>
              </div>
              <input
                type="text"
                name="family_name"
                placeholder="Please enter your last name"
              />
              <div>
                <label>Email</label>
              </div>
              <input
                type="text"
                name="email"
                placeholder="Please enter a valid email"
              />
            </>
          ),
        },
      }}
      services={{
        validateCustomSignUp: async (formData: { [key: string]: string }) => {
          const errors: { [key: string]: string } = {};
          if (!formData.given_name) {
            errors.given_name = "First Name is required";
          }
          if (!formData.family_name) {
            errors.family_name = "Last Name is required";
          }
          if (!formData.email) {
            errors.email = "Email is required";
          }
          return errors;
        },
      }}
    >
      {({ signOut, user }) => (
        <div>
          Welcome {user?.username}
          <button onClick={signOut}>Sign out</button>
          <h4>Your JWT token:</h4>
          {jwtToken}
        </div>
      )}
    </Authenticator>
  );
}

export default App;
