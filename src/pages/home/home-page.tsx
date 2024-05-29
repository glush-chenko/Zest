import Box from "@mui/material/Box";
import React from "react";
import {Content} from "../../features/main/content/content";
import {RightSection} from "../../features/main/right-section/right-section";
import {LeftSection} from "../../features/main/left-section/left-section";
import {useParams} from "react-router-dom";

export const HomePage = () => {
    const {type} = useParams();

    return (
        <Content />
        // // <Box sx={{display: "flex", overflow: "hidden", flexGrow: 1}}>
        //     {/*<LeftSection />*/}
        //     {/*<RightSection />*/}
        // {/*</Box>*/}
    );
}