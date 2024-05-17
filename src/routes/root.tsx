import React from "react";
import {Navigation} from "../features/header/header-nav/navigation";
import {Outlet} from "react-router-dom";
import {LeftSection} from "../features/main/left-section/left-section";

export const Root = () => {
    return (
        <>
            <Navigation />
            {/*<LeftSection />*/}
            <Outlet />
        </>
    )
}