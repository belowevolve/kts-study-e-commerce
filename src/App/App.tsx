import { AnimatePresence } from "framer-motion";
import * as React from "react";
import {
  RouterProvider,
  createRoutesFromElements,
  createHashRouter,
  Route,
} from "react-router-dom";
import AnimatedRoutes from "./components/AnimatedRoutes";

const App: React.FC = () => {
  return (
    <AnimatePresence>
      <RouterProvider
        router={createHashRouter(
          createRoutesFromElements(
            <Route path="*" element={<AnimatedRoutes />} />
          )
        )}
      />
    </AnimatePresence>
  );
};

export default App;
