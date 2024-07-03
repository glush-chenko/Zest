import React, {useCallback} from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import {setAvatarSrc} from "../header-slice";
import {useAppDispatch} from "../../../app/hooks";
import {images} from "../../../assets/avatars/images";
import Box from "@mui/material/Box";
import {useTheme} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import {useLocation, useNavigate} from "react-router-dom";

export const HeaderModalProfile = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();

    const handleClose = useCallback(() => {
        navigate(location.state?.previousRoute || "/");
    }, [navigate]);

    const handleClickAvatar = useCallback((event: React.MouseEvent<HTMLImageElement>) => {
        const imageSrc = (event.target as HTMLImageElement).src;
        dispatch(setAvatarSrc(imageSrc));
        handleClose();
    }, [dispatch])

    return (
        <Dialog
            open
            onClose={handleClose}
            fullWidth={true}
            maxWidth="sm"
            PaperProps={{
                sx: {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: "1rem",
                    '& ::-webkit-scrollbar': {
                        width: '0.6rem',
                    },
                    '& ::-webkit-scrollbar-thumb': {
                        backgroundColor: theme.palette.grey[500],
                        borderRadius: '4px',
                    },
                },
            }}
        >
            <DialogTitle
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: theme.palette.primary.main,
                    width: "100%",
                    maxHeight: "4rem",
                    color: theme.palette.primary.contrastText,
                    [theme.breakpoints.down('sm')]: {
                        fontSize: "large",
                        maxHeight: "3rem",
                        padding: "0.5rem 1rem"
                    }
                }}
            >
                Select an avatar for your profile
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                >
                    <CloseIcon sx={{fontSize: "1.3rem", color: `${theme.palette.primary.contrastText}`}}/>
                </IconButton>
            </DialogTitle>

            <DialogContent
                sx={{
                    padding: 0,
                    backgroundColor: theme.palette.grey[300],
                }}
            >
                <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    gap: 2,
                    maxHeight: "37rem",
                    padding: "1rem"
                }}>
                    {images.map((image, index) => (
                        <Box
                            key={`image ${index}`}
                            sx={{
                                flex: "0 0 22%",
                                height: "auto",
                                [theme.breakpoints.down('sm')]: {
                                    flex: "0 0 27%",
                                }
                            }}
                        >
                            <Box
                                component="img"
                                src={image}
                                alt={`Avatar ${image}`}
                                onClick={handleClickAvatar}
                                sx={{
                                    width: "100%",
                                    height: "auto",
                                    // border: `1px solid ${theme.palette.grey[500]}`,
                                    borderRadius: "4rem",
                                    backgroundColor: theme.palette.common.white,
                                    cursor: "pointer",
                                    "&:hover": {
                                        opacity: 0.8
                                    },
                                }}
                            />
                        </Box>
                    ))}
                </Box>
            </DialogContent>
        </Dialog>
    );
}