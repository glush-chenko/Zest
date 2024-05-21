import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import {useTheme} from "@mui/material";

// const actions = [
//     { icon: <FileCopyIcon />, name: 'Copy' },
//     { icon: <SaveIcon />, name: 'Save' },
//     { icon: <PrintIcon />, name: 'Print' },
//     { icon: <ShareIcon />, name: 'Share' },
// ];

export const OpenIconSpeedDial = () => {
    const theme = useTheme();

    return (
        <Box sx={{
            // height: 320,
            transform: 'translateZ(0px)',
            // flexGrow: 1,
            position: "absolute",
            bottom: theme.spacing(7),
            right: theme.spacing(13),
            '& .css-dlyp1q-MuiButtonBase-root-MuiFab-root-MuiSpeedDial-fab': {
                backgroundColor: theme.palette.secondary.main,
                '&:hover': {
                    backgroundColor: theme.palette.secondary.main,
                }
            },
            "& .css-g5cqhr-MuiButtonBase-root-MuiFab-root-MuiSpeedDial-fab": {
                backgroundColor: theme.palette.themeSwitch.lightThumb,
                '&:hover': {
                    backgroundColor: theme.palette.themeSwitch.lightThumb,
                }
            }
        }}>
            <SpeedDial
                ariaLabel="SpeedDial openIcon example"
                // sx={{
                //     position: 'absolute',
                //     '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
                //         bottom: theme.spacing(-20),
                //         right: theme.spacing(-80),
                //     }
                // }}
                icon={<SpeedDialIcon openIcon={<EditIcon/>}/>}
            >
                {/*{actions.map((action) => (*/}
                {/*    <SpeedDialAction*/}
                {/*        key={action.name}*/}
                {/*        icon={action.icon}*/}
                {/*        tooltipTitle={action.name}*/}
                {/*    />*/}
                {/*))}*/}
            </SpeedDial>
        </Box>
    );
}