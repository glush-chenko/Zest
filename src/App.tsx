import './App.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import {Root} from "./routes/root";
import {HomePage} from "./pages/home/home-page";
import {ThemeProvider} from "./theme/theme-provider/theme-provider";
import React from "react";

const appRouter = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Root/>}>
      <Route index element={<HomePage/>} />
    </Route>
));

function App() {
  return (
      <ThemeProvider>
          <RouterProvider router={appRouter} />
      </ThemeProvider>
  );
}

export default App;
