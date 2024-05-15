import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import {ErrorPage} from "./error-page/error-page";

const container = document.getElementById('root')!;
const root = createRoot(container);

// const router = createBrowserRouter([
//     {
//         path: "/",
//         element:<App />,
//         errorElement: <ErrorPage />,
//     },
// ]);

root.render(
  <React.StrictMode>
    <Provider store={store}>
        {/*<RouterProvider router={router} />*/}
        {/*<BrowserRouter >*/}
            <App />
        {/*</BrowserRouter >*/}
        {/*<Router >*/}
        {/*    <Route path="/" element={<App />} />*/}
        {/*</Router>*/}
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
