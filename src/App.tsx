import './App.css';
import {
    createBrowserRouter,
    createRoutesFromElements, Navigate,
    Route,
    RouterProvider,
    Routes
} from 'react-router-dom';
import {Root} from "./routes/root";
import {HomePage} from "./pages/home/home-page";
import {ThemeProvider} from "./theme/theme-provider/theme-provider";
import React from "react";
import {CssBaseline} from "@mui/material";
import {TaskModal} from "./components/task/task-modal/task-modal";
import {Content} from "./features/main/content/content";

const appRouter = createBrowserRouter(createRoutesFromElements(
    // <Routes>
        <Route path="/" element={<Root/>}>
            <Route index element={<HomePage/>}/>
            <Route path=":type" element={<HomePage/>}/>
            <Route path="/add-task" element={<TaskModal />}/>
            <Route path="/tasks" element={<Content />}/>
            {/*<Route path="*" element={<Navigate to="/add-task" replace />} />*/}
        </Route>
    // </Routes>
));

function App() {
    return (
        <ThemeProvider>
            <CssBaseline/>
            <RouterProvider router={appRouter}/>
        </ThemeProvider>
    );
}

export default App;
