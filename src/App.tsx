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
import {CssBaseline} from "@mui/material";
import {TaskModal} from "./components/task/task-modal/task-modal";
import {Content} from "./features/main/content/content";
import {TaskEditModal} from "./components/task/task-edit-modal/task-edit-modal";


const appRouter = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Root/>}>
        <Route index element={<HomePage/>}/>
        <Route path=":type" element={<HomePage/>}/>
        <Route path=":type/:id" element={<TaskEditModal />}/>
        <Route path="/add-task" element={<TaskModal/>}/>
        <Route path="/tasks" element={<Content/>}/>
        {/*<Route path="*" element={<Navigate to="/add-task" replace />} />*/}
    </Route>
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
