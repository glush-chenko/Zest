import React, {useCallback} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useSnackbarWithAction} from "../../app/hooks";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import {useMediaQuery, useTheme} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";

export const LoginPage = () => {
    const [error, setError] = React.useState<string | null>(null);
    const [isLoginMode, setIsLoginMode] = React.useState<boolean>(true);

    const clientId = process.env.REACT_APP_TODOIST_CLIENT_ID || "";
    const testToken = process.env.REACT_APP_TODOIST_TEST_TOKEN || "";

    const location = useLocation();
    const navigate = useNavigate();
    const theme = useTheme();
    const {enqueueSnackbar, closeSnackbar} = useSnackbarWithAction();

    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const randomState = Math.random().toString(36).substring(2, 10);
    localStorage.setItem('todoist_state', randomState);


    const handleTodoistAuth = useCallback(() => {
        const authUrl = `https://todoist.com/oauth/authorize?client_id=${clientId}&scope=data:delete,data:read_write&state=${randomState}`;

        try {
            window.location.href = authUrl;
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
                enqueueSnackbar(
                    error || 'Error during Todoist authorization. Please try again.',
                    () => {
                        closeSnackbar();
                    },
                    'Close'
                );
            }
        }
    }, [clientId, navigate, location]);

    const handleTodoistAuthTest = useCallback(() => {
        localStorage.setItem('todoist_access_test_token', testToken);
        navigate('/');
    }, [navigate]);

    const toggleMode = useCallback(() => {
        setIsLoginMode((prevMode) => !prevMode);
    }, []);

    return (
        <Dialog
            open
            fullWidth
            fullScreen={fullScreen}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle sx={{display: "flex", justifyContent: "center"}}>
                {isLoginMode ? 'Login with Todoist' : 'Use Test Token'}
            </DialogTitle>
            <DialogContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0.5rem"
                }}
            >
                {isLoginMode ? (
                    <>
                        <DialogContentText>
                            Log in with your Todoist account to access all features.
                        </DialogContentText>
                        <Button
                            // variant="outlined"
                            variant="contained"
                            onClick={handleTodoistAuth}
                        >
                            Login with Todoist
                        </Button>
                    </>
                ) : (
                    <>
                        <DialogContentText>
                            Use test access to try out the app without creating an account
                        </DialogContentText>
                        <DialogContentText>
                            You will have limited access. All data may be lost
                        </DialogContentText>
                        <Button
                            // variant="outlined"
                            variant="contained"
                            onClick={handleTodoistAuthTest}
                        >
                            Use Test Access
                        </Button>
                    </>
                )}
            </DialogContent>
            <DialogActions sx={{display: "flex", justifyContent: "center"}}>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={toggleMode}
                >
                    {isLoginMode
                        ? 'Don\'t have a Todoist account? Use the test access'
                        : 'Have a Todoist account? Login'}
                </Button>
            </DialogActions>
        </Dialog>
    )
}