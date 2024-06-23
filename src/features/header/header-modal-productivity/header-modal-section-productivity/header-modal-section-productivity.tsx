import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";
import {useTheme} from "@mui/material";

interface HeaderModalSectionProductivityProps {
    text: string;
    chartData: string;
    hintText: string
}

export const HeaderModalSectionProductivity = (props: HeaderModalSectionProductivityProps) => {
    const {text, chartData, hintText} = props;
    const theme = useTheme();

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}
        >
            <Box sx={{display: "flex"}}>
                <Typography
                    variant="body1"
                    color={theme.palette.mode === "light" ? theme.palette.grey[600] : theme.palette.common.white}
                >
                    {text}
                </Typography>
                <Tooltip title={hintText} placement="top" arrow>
                    <InfoIcon
                        sx={{
                            fontSize: "0.7rem",
                            color: `${theme.palette.grey[400]}`,
                            cursor: "pointer"
                        }}
                    />
                </Tooltip>
            </Box>
            <Typography variant="body1" sx={{fontWeight: 600}}>
                {chartData}%
            </Typography>
        </Box>
    )
}