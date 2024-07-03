import Box from "@mui/material/Box";
import loading from "../../assets/loading.svg"

export const Loading = () => {
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
                left: "3%",
                top: 0,
            }}
        >
            <img src={loading} alt="animation"/>
        </Box>
    )
}