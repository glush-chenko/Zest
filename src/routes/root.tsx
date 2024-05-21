import React from "react";
import {Navigation} from "../features/header/header-nav/navigation";
import {Outlet} from "react-router-dom";
import { ResizableBox } from 'react-resizable';
import {Content} from "../features/main/content/content";

export const Root = () => {
    return (
        <>
            <Navigation />
            <Outlet />
        </>
    )
}