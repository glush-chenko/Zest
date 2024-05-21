import React from "react";
import {ContentBox} from "../../../components/styled/content-box";
import Astronaut from "../../../assets/Astronaut-01.svg"
import Typography from "@mui/material/Typography";
import {useTheme} from "@mui/material";
import {ContentImage} from "../../../components/styled/content-image";
import {OpenIconSpeedDial} from "../../../components/generic/open-icon-speed-dial";

export const Content = () => {
    const theme = useTheme();

    return (
        <ContentBox>
            <ContentImage src={Astronaut} alt="content-image-astronaut"/>
            <Typography variant="subtitle1" sx={{
                color: theme.palette.text.primary,
                textAlign: 'center',
                '& span': {
                    display: 'block'
                },
                '& span:first-child': {
                    fontWeight: 'bold',
                }
            }} gutterBottom>
                <span>What will you do today? </span>
                <span>Every day is an opportunity to move forward.
                    {/*Select a few important tasks, add them to the list and get satisfaction from completing them. */}
                </span>
                <span>Plan, relax, celebrate your successes. This will help you achieve your goals. </span>
            </Typography>
            <OpenIconSpeedDial />
        </ContentBox>
    )
}