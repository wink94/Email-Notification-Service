import { CognitoUserPool } from "amazon-cognito-identity-js";
import { useCallback, useEffect, useState } from "react";

export const Pool_Data = {
  UserPoolId: "us-east-1_Q7IgOU3ZM",
  ClientId: "6uvu0air98gr5e228lo52itr06",
};

export function useLoginHandler() {
  const [state, setstate] = useState({
    loading: false,
    isAuthenticated: false,
  });

  const { loading, isAuthenticated } = state;

  const userPool = new CognitoUserPool(Pool_Data);

  const getAuthenticatedUser = useCallback(() => {
    return userPool.getCurrentUser();
  }, []);

  console.log(getAuthenticatedUser());

  useEffect(() => {
    getAuthenticatedUser();
  }, [getAuthenticatedUser]);

  const signOut = () => {
    return userPool.getCurrentUser()?.signOut();
  };
  console.log("I am here", getAuthenticatedUser()?.getUsername());

  return {
    loading,
    isAuthenticated,
    userPool,
    getAuthenticatedUser,
    signOut,
  };
}
