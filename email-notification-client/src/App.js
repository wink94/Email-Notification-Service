import logo from "./logo.svg";
import "./App.css";
import EmailForm from "./EmailForm/EmailForm";
import LoginForm from "./EmailForm/LoginForm";
import { create } from "zustand";

export const useTokenStore = create((set) => ({
  accessToken: null,
  user: null,
  setAccessToken: (accessToken) => {
    window.sessionStorage.setItem("accessToken", accessToken);
    set((state) => ({ accessToken: accessToken }));
  },
  setUser: (user) => {
    window.sessionStorage.setItem("user", user);
    set((state) => ({ user: user }));
  },
  getAccessTokenFromStorage: () => {
    return window.sessionStorage.getItem("accessToken");
  },
  getUserTokenFromStorage: () => {
    return window.sessionStorage.getItem("user");
  },
}));

function App() {
  return (
    <div className="App">
      <LoginForm />
    </div>
  );
}

export default App;
