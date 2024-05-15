import './App.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import {ErrorPage} from "./error-page/error-page";
import {Root} from "./routes/root";
import {HomePage} from "./pages/home/home-page";

const appRouter = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Root/>}>
      <Route index element={<HomePage/>} />
    </Route>
));

function App() {
  return (
      // <Router >
      //     <Routes>
      //         <Route path="/" element={<ErrorPage />} />
      //     </Routes>
      // </Router>
      // <div>
      //     Hello!
      // </div>

      <RouterProvider router={appRouter} />
  );
}

export default App;
