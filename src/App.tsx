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
import React, {useEffect} from "react";
import {CssBaseline} from "@mui/material";
import {TaskModal} from "./components/task/task-modal/task-modal";
import {Content} from "./features/main/content/content";
import {TaskEditModal} from "./components/task/task-edit-modal/task-edit-modal";
import AboutPage from "./pages/about/about-page";
import { SnackbarProvider } from 'notistack';
import updateLocale from 'dayjs/plugin/updateLocale';
import dayjs from "dayjs";

dayjs.extend(updateLocale);

dayjs.updateLocale('en', {
    // Sunday = 0, Monday = 1.
    weekStart: 1,
});


const appRouter = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Root/>}>
        <Route index element={<HomePage/>}/>
        <Route path=":type" element={<HomePage/>}/>
        <Route path=":type/:id" element={<TaskEditModal/>}/>
        <Route path="/add-task" element={<TaskModal/>}/>
        <Route path="/tasks" element={<Content/>}/>
        <Route path="/about" element={<AboutPage/>}/>
        {/*<Route path="*" element={<Navigate to="/add-task" replace />} />*/}
    </Route>
));

function App() {

    return (
        <ThemeProvider>
            <SnackbarProvider maxSnack={3}>
                <CssBaseline/>
                <RouterProvider router={appRouter}/>
            </SnackbarProvider>
        </ThemeProvider>
    );
}

export default App;
