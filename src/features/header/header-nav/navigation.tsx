import React, {useContext} from "react";
import {FormControlLabel} from "@mui/material";
import {ThemeContextType} from "../../../types/theme-context-type";
import {ThemeContext} from "../../../theme/context/theme-context"
import {StyledSwitch} from "../../../components/label/styles";

export const Navigation = () => {
    const {mode, toggleTheme} = useContext(ThemeContext) as ThemeContextType;

    return (
        <FormControlLabel
            control={
                <StyledSwitch
                    checked={mode === 'dark'}
                    onChange={toggleTheme}
                    name="theme-toggle"
                    color="primary"
                />
            }
            label=""
        />
    )
}