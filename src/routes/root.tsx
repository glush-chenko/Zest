import React from "react";
import {Navigation} from "../features/header/header-nav/navigation";
import {Outlet} from "react-router-dom";

export const Root = () => {
    return (
        <>
            <Navigation />
            <Outlet />
        </>
    )
}