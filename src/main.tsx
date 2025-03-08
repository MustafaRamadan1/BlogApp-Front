import { createRoot } from "react-dom/client";
import { BrowserRouter, Route } from "react-router";
import App from "./App.tsx";
import "./index.css";
import { Routes } from "react-router";
import BlogsPage from "./layout/BlogsPage.tsx";
import Layout from "./ui/Layout.tsx";
import ProtectedRoute from "./ui/ProtectedRoute.tsx";
import SinglePost from "./layout/SinglePost.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route
        path="/posts"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<BlogsPage />} />
        <Route path="/posts/:id" element={<SinglePost />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
