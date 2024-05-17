import React from "react";
import {Navigation} from "../features/header/header-nav/navigation";
import {Outlet} from "react-router-dom";
import { ResizableBox } from 'react-resizable';

export const Root = () => {
    return (
        <>
            <Navigation />
            <Outlet />
        </>
    )
}