import React from "react";
import Button from '@mui/material/Button';
import {SnackbarProvider, VariantType, useSnackbar, SnackbarKey} from 'notistack';
import {useTheme} from "@mui/material";

interface SnackbarProps {
    message: string;
    variant?: VariantType;
    ButtonComponent: React.ReactElement;
}

export const Snackbar = (props: SnackbarProps) => {
    const {message, variant, ButtonComponent} = props;
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();

    const showSnackbar = (variant: VariantType) => {
        console.log("Я ПОКАЗЫВАЮСЬ!!")
        const action = (key: SnackbarKey) => (
            <Button
                color="secondary"
                size="small"
                onClick={() => {
                    closeSnackbar(key);
                }}
            >
                Edit
            </Button>
        );

        enqueueSnackbar(message, {
            variant,
            action,
            anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left',
            },
            autoHideDuration: variant === 'success' ? 3000 : 6000,
            onClose: (event: React.SyntheticEvent<any, Event> | null, reason, key) => {
                if (['clickaway', 'timeout'].includes(reason)) {
                    return;
                }
                closeSnackbar(key);
            },
        });
    };

    return (
    <SnackbarProvider maxSnack={3}>
        {React.cloneElement(ButtonComponent, {
            onClick: showSnackbar,
        })}
    </SnackbarProvider>
    );
};