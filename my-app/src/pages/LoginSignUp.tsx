import { signUp } from "aws-amplify/auth";
import { confirmSignUp, type ConfirmSignUpInput } from "aws-amplify/auth";
import { autoSignIn } from "aws-amplify/auth";
import { signIn, type SignInInput } from "aws-amplify/auth";
import { signOut } from "aws-amplify/auth";

type SignUpParameters = {
  username: string;
  password: string;
  email: string;
  phone_number: string;
};

async function handleSignUp({
  username,
  password,
  email,
  phone_number,
}: SignUpParameters) {
  try {
    const { isSignUpComplete, userId, nextStep } = await signUp({
      username,
      password,
      options: {
        userAttributes: {
          email,
          phone_number, // E.164 number convention
        },
        // optional
        autoSignIn: true, // or SignInOptions e.g { authFlowType: "USER_SRP_AUTH" }
      },
    });

    console.log(userId);
  } catch (error) {
    console.log("error signing up:", error);
  }

  async function handleSignUpConfirmation({
    username,
    confirmationCode,
  }: ConfirmSignUpInput) {
    try {
      const { isSignUpComplete, nextStep } = await confirmSignUp({
        username,
        confirmationCode,
      });
    } catch (error) {
      console.log("error confirming sign up", error);
    }
  }

  async function handleAutoSignIn() {
    try {
      const signInOutput = await autoSignIn();
      // handle sign-in steps
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSignIn({ username, password }: SignInInput) {
    try {
      const { isSignedIn, nextStep } = await signIn({ username, password });
    } catch (error) {
      console.log("error signing in", error);
    }
  }

  async function handleSignOut() {
    try {
      await signOut();
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }
}
