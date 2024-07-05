import Box from "@mui/material/Box";
import loading from "../../assets/loading.svg"
import {useTheme} from "@mui/material";

export const Loading = () => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                width: "100%",
                position: "absolute",
                backgroundColor: "#0000004f",
                left: 0,
                top: 0,
            }}
        >
            <Box
                component="img"
                src={loading}
                alt="animation"
                sx={{
                    [theme.breakpoints.up('md')]: {
                        maxHeight: "8rem"
                    },
                    [theme.breakpoints.down('md')]: {
                        maxHeight: "6rem"
                    },
                }}
            />
        </Box>
    )
}