import React from "react";
import Box from "@mui/material/Box";
import Astronaut from "../../assets/Astronaut-01.svg";
import Typography from "@mui/material/Typography";
import {OpenIconSpeedDial} from "../../components/generic/open-icon-speed-dial";
import {useTheme} from "@mui/material";

export const HomePage = () => {
    const theme = useTheme();

    return (
        <>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%"
            }}>
                <Box
                    component="img"
                    src={Astronaut}
                    maxWidth="20rem"
                    marginBottom="1.5rem"
                    alt="content-image-astronaut"
                />
                <Typography variant="subtitle1" sx={{
                    color: theme.palette.text.primary,
                    textAlign: 'center',
                    '& span': {
                        display: 'block'
                    },
                    '& span:first-of-type': {
                        fontWeight: 'bold',
                    }
                }} gutterBottom>
                    <span>What will you do today? </span>
                    <span>Every day is an opportunity to move forward.</span>
                    {/*Select a few important tasks, add them to the list and get satisfaction from completing them. */}
                    <span>Plan, relax, celebrate your successes. This will help you achieve your goals. </span>
                </Typography>
            </Box>
        </>
    );
}