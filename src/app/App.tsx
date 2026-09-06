import React, { useState } from "react";
import { RouterProvider } from "react-router";
import { router } from "@/router/appRouter";
import { PreloaderScreen } from "@/pages/auth/PreloaderScreen";

export function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <RouterProvider router={router} />
      {loading && <PreloaderScreen onDone={() => setLoading(false)} />}
    </>
  );
}

export default App;

