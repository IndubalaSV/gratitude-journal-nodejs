import useAuthStore from "../store/authStore";
import React from "react";

const AuthButton = () => {
  const { user, login, logout } = useAuthStore();

  return (
    <div className="text-center">
      {user ? (
        <button className="btn btn-error" onClick={logout}>
          Logout
        </button>
      ) : (
        <button className="btn btn-primary" onClick={login}>
          Sign in with Google
        </button>
      )}
    </div>
  );
};

export default AuthButton;
