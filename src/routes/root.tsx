import React, {useEffect} from "react";
import {Navigation} from "../features/header/header-nav/navigation";
import {Outlet, useLocation} from "react-router-dom";
import {RightSection} from "../features/main/right-section/right-section";
import {LeftSection} from "../features/main/left-section/left-section";
import Box from "@mui/material/Box";
import AboutPage from "../pages/about/about-page";
import {OpenIconSpeedDial} from "../components/generic/open-icon-speed-dial";
import {useTheme} from "@mui/material";
import {isUserLoggedIn} from "../utils/auth";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {SCREEN_NAMES, selectHeader} from "../features/header/header-slice";
import {getCompletedTasks, syncTodosLoadTasks} from "../api/todoist-api";
import {selectToken} from "../pages/login/login-slice";

export const Root = () => {
    const location = useLocation();
    const isLoggedIn = isUserLoggedIn();
    const theme = useTheme();
    const dispatch = useAppDispatch();

    const {currentScreenName} = useAppSelector(selectHeader);
    const token = useAppSelector(selectToken)

    useEffect(() => {
        if (token) {
            switch (currentScreenName) {
                case SCREEN_NAMES.HOME:
                    dispatch(getCompletedTasks());
                    dispatch(syncTodosLoadTasks());
                    break;
            }
        }
    }, [dispatch, currentScreenName, token]);

    return (
        (location && location.pathname === "/about") ? (
            <>
                <Navigation isLoggedIn={isLoggedIn}/>
                <AboutPage/>
            </>
        ) : (
            <>
                <Navigation isLoggedIn={isLoggedIn}/>
                <Box sx={{
                    display: "flex",
                    overflow: "hidden",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    height: "100%",
                    '& ::-webkit-scrollbar': {
                        width: '0.6rem',
                    },
                    '& ::-webkit-scrollbar-thumb': {
                        backgroundColor: theme.palette.grey[400],
                        borderRadius: '4px',
                    },
                }}>
                    <LeftSection isLoggedIn={isLoggedIn}/>
                    <Outlet/>
                    <OpenIconSpeedDial/>
                    <RightSection/>
                </Box>
            </>
        )

    )
}