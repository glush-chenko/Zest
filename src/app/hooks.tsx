import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import type {RootState, AppDispatch} from './store';
import {BaseVariant, OptionsObject, useSnackbar} from "notistack";
import Button from "@mui/material/Button";
import React from "react";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useSnackbarWithAction = () => {
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    const open = (
        message: string,
        onButtonClick: () => void,
        options?: OptionsObject,
    ) => {
        const defaultOptions: OptionsObject = {
            variant: "success",
            anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left',
            },
            autoHideDuration: 3000,
        };

        enqueueSnackbar(message, {
            action: (
                <Button
                    color="secondary"
                    size="small"
                    onClick={onButtonClick}
                >
                    Edit
                </Button>
            ),
            ...defaultOptions,
            ...options
        })
    }
    return {
        enqueueSnackbar: open,
        closeSnackbar
    }
}
