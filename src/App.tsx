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
import React, {useEffect} from "react";
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
import {SearchPage} from "./pages/search/search-page";
import {LoginPage} from "./pages/login/login-page";
import {CallbackHandler} from "./pages/login/callback-handler/callback-handler";
import {PrivateRoute} from "./routes/private-route/PrivateRoute";
import {Loading} from "./components/generic/loading";
import {useAppDispatch} from "./app/hooks";
import {setScreenWidth} from "./features/screen-slice";

dayjs.extend(updateLocale);

dayjs.updateLocale('en', {
    // Sunday = 0, Monday = 1.
    weekStart: 1,
});


const appRouter = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Root/>}>
        <Route index element={<PrivateRoute><HomePage /></PrivateRoute>}/>
        <Route path="add-task" element={<PrivateRoute><TaskModal/></PrivateRoute>}/>
        <Route path="tasks" element={<PrivateRoute><Content/></PrivateRoute>}>
            <Route path=":id" element={<PrivateRoute><TaskEditModal/></PrivateRoute>}/>
        </Route>
        <Route path="about" element={<AboutPage/>}/>
        <Route path="productivity" element={<PrivateRoute><HeaderModalProductivity /></PrivateRoute>}/>
        <Route path="profile" element={<PrivateRoute><HeaderModalProfile/></PrivateRoute>}/>
        <Route path="activity" element={<PrivateRoute><ActivityPage/></PrivateRoute>} >
            <Route path=":id" element={<PrivateRoute><ActivityPage /></PrivateRoute>} />
        </Route>
        <Route path="search" element={<PrivateRoute><SearchPage/></PrivateRoute>}/>
        <Route path="callback" element={<CallbackHandler />}/>
        <Route path="login" element={<LoginPage />}/>
        <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
));

function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const handleResize = () => {
            dispatch(setScreenWidth(window.innerWidth));
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [dispatch]);

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
