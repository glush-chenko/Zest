import React from "react";
import { useRouteError } from "react-router-dom";

export const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);

    if (error instanceof Error) {
        return (
            <div >
                <h1>Oops!</h1>
                <p>Sorry, an unexpected error has occurred.</p>
                <p>
                    <i>{error.message}</i>
                </p>
            </div>
        )
    } else if (typeof error === 'object' && error !== null) {
        return (
            <div>
                <h1>Oops!</h1>
                <p>Sorry, an unexpected error has occurred.</p>
                <p>
                    <i>
                        {(error as { statusText?: string; message?: string }).statusText ??
                            (error as { statusText?: string; message?: string }).message ??
                            'Unknown error'}
                    </i>
                </p>
            </div>
        )
    } else {
        return (
            <div>
                <h1>Oops!</h1>
                <p>Sorry, an unexpected error has occurred.</p>
                <p>
                    <i>Unknown error</i>
                </p>
            </div>
        )
    }
}