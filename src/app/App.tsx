import React from "react";
import { RouterProvider } from "react-router";
import { router } from "@/router/appRouter";

export function App() {
  return <RouterProvider router={router} />;
}

export default App;
