import React from "react";
import { useRouteError } from "react-router-dom";
import Box from "@mui/material/Box";

export const ErrorPage = () => {
    const error = useRouteError();

    if (error instanceof Error) {
        return (
            <Box>
                <h1>Oops!</h1>
                <p>Sorry, an unexpected error has occurred.</p>
                <p>
                    <i>{error.message}</i>
                </p>
            </Box>
        )
    } else if (typeof error === 'object' && error !== null) {
        return (
            <Box>
                <h1>Oops!</h1>
                <p>Sorry, an unexpected error has occurred.</p>
                <p>
                    <i>
                        {(error as { statusText?: string; message?: string }).statusText ??
                            (error as { statusText?: string; message?: string }).message ??
                            'Unknown error'}
                    </i>
                </p>
            </Box>
        )
    } else {
        return (
            <Box>
                <h1>Oops!</h1>
                <p>Sorry, an unexpected error has occurred.</p>
                <p>
                    <i>Unknown error</i>
                </p>
            </Box>
        )
    }
}