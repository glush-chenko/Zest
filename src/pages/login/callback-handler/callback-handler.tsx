import React, {useEffect} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import Box from "@mui/material/Box";
import {Loading} from "../../../components/generic/loading";
import {getCompletedTasks, syncTodosLoadTasks} from "../../../api/todoist-api";
import {useAppDispatch} from "../../../app/hooks";
import {setToken} from "../login-slice";

export const CallbackHandler = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const code = searchParams.get('code');
        const state = searchParams.get('state');
        const storedState = localStorage.getItem('todoist_state');

        if (state !== storedState) {
            // navigate('/error');
            return;
        }

        const clientId = process.env.REACT_APP_TODOIST_CLIENT_ID || "";
        const clientSecret =  process.env.REACT_APP_TODOIST_CLIENT_SECRET || "";
        const redirectUri = process.env.REACT_APP_TODOIST_REDIRECT_URL || "";

        const requestBody = new URLSearchParams({
            client_id: clientId,
            client_secret: clientSecret,
            code: code || '',
            redirect_uri: redirectUri,
        });

        fetch('https://todoist.com/oauth/access_token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: requestBody,
        })
            .then((response) => response.json())
            .then((data) => {
                localStorage.setItem('todoist_access_token', data.access_token);
                dispatch(setToken(data.access_token));
                navigate('/');
                dispatch(getCompletedTasks());
                dispatch(syncTodosLoadTasks());
            })
            .catch((error) => {
                console.error('Error exchanging code for access token:', error);
                // navigate('/error');
            });
    }, [searchParams, navigate]);

    return <Loading />;
}