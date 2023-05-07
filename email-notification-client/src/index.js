import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import EmailForm from "./EmailForm/EmailForm";
import RecipientPopups from "./EmailForm/RecipientsPopup";
import TemplatePopup from "./EmailForm/TemplatePopup";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/app",
    element: <EmailForm />,
  },
  {
    path: "/app/recipient",
    element: <RecipientPopups />,
  },
  {
    path: "/app/template",
    element: <TemplatePopup />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

