import './App.css';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
    Navigate,
} from 'react-router-dom';
import {Root} from "./routes/root";
import {HomePage} from "./pages/home/home-page";
import {ThemeProvider} from "./theme/theme-provider/theme-provider";
import React from "react";
import {CssBaseline} from "@mui/material";
import {TaskModal} from "./components/task/task-modal/task-modal";
import {Content} from "./features/main/content/content";
import {TaskEditModal} from "./components/task/task-edit-modal/task-edit-modal";
import AboutPage from "./pages/about/about-page";
import { SnackbarProvider } from 'notistack';
import updateLocale from 'dayjs/plugin/updateLocale';
import dayjs from "dayjs";
import {ActivityPage} from "./pages/activity/activity-page";
import {HeaderModalProfile} from "./features/header/header-modal-profile/header-modal-profile";
import {HeaderModalProductivity} from "./features/header/header-modal-productivity/header-modal-productivity";
import {ActivityCard} from "./pages/activity/activity-card/activity-card";
import {ActivityListItem} from "./pages/activity/activity-list-item/activity-list-item";
import {SearchPage} from "./pages/search/search-page";

dayjs.extend(updateLocale);

dayjs.updateLocale('en', {
    // Sunday = 0, Monday = 1.
    weekStart: 1,
});


const appRouter = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Root/>}>
        <Route index element={<HomePage/>}/>
        <Route path="add-task" element={<TaskModal/>}/>
        <Route path="tasks" element={<Content/>}>
            <Route path=":id" element={<TaskEditModal/>}/>
        </Route>
        <Route path="about" element={<AboutPage/>}/>
        <Route path="productivity" element={<HeaderModalProductivity />}/>
        <Route path="profile" element={<HeaderModalProfile/>}/>
        <Route path="activity" element={<ActivityPage/>} >
            <Route path=":id" element={<ActivityPage />} />
        </Route>
        <Route path="search" element={<SearchPage/>}/>
        <Route path="*" element={<Navigate to="/" replace />} />
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
