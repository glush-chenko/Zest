import React from "react";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import {NavLink} from "react-router-dom";

interface SortingProps {
    periods: { period?: string; text: string }[];
    selectedText: string;
    onTextChange: (period: string) => void;
}

export const Sorting = (props: SortingProps) => {
    const {periods, selectedText, onTextChange} = props;

    return (
        <TextField
            value={selectedText}
            size="small"
            select
            sx={{
                "& .MuiSelect-select.MuiOutlinedInput-input": {
                    height: "2.5rem",
                    boxSizing: "border-box"
                },
                "& .MuiOutlinedInput-notchedOutline": {
                    border: 'none',
                },
                "& .MuiSelect-select": {
                    display: "flex",
                    alignItems: "center",
                    padding: 0
                }
            }}
            onChange={(e) => onTextChange(e.target.value)}
            variant="outlined"
        >
            {periods.map((period) => (
                    <MenuItem
                        value={period.text}
                        key={`option ${period.text}`}
                    >
                        <Typography variant="subtitle2">
                            {period.text.toUpperCase()}
                        </Typography>
                    </MenuItem>
            ))}

        </TextField>
    )

}