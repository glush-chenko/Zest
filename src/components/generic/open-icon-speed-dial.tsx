import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import EditIcon from '@mui/icons-material/Edit';
import {useTheme} from "@mui/material";
import {NavLink} from "react-router-dom";

export const OpenIconSpeedDial = () => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                transform: 'translateZ(0px)',
                position: "absolute",
                bottom: theme.spacing(7),
                right: theme.spacing(13),
            }}
        >
            <NavLink
                to={`/add-task`}
                style={{
                    textDecoration: 'none',
                }}
            >
                <SpeedDial
                    ariaLabel="SpeedDial openIcon example"
                    icon={<SpeedDialIcon openIcon={<EditIcon/>}/>}
                    sx={{
                        "& .MuiSpeedDial-fab": {
                            backgroundColor: theme.palette.secondary.main,
                            "&:hover": {
                                backgroundColor: theme.palette.secondary.main
                            }
                        }
                    }}
                />
            </NavLink>
        </Box>
    );
}