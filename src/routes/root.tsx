import React from "react";
import {Navigation} from "../features/header/header-nav/navigation";
import {Outlet, useLocation} from "react-router-dom";
import {Content} from "../features/main/content/content";
import {RightSection} from "../features/main/right-section/right-section";
import {TaskModal} from "../components/task/task-modal/task-modal";
import {HomePage} from "../pages/home/home-page";
import {LeftSection} from "../features/main/left-section/left-section";
import Box from "@mui/material/Box";
import AboutPage from "../pages/about/about-page";

export const Root = () => {
    const location = useLocation();

    return (
        (location && location.pathname === "/about") ? (
            <>
                <Navigation />
                <AboutPage />
            </>
        ) : (
            <>
                <Navigation />
                <Box sx={{
                    display: "flex",
                    overflow: "hidden",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    height: "100%"
                }}>
                    <LeftSection/>
                    <Outlet/>
                    <RightSection/>
                </Box>
            </>
        )

    )
}