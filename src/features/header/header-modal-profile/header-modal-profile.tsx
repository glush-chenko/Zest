import React, {useCallback} from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import {selectHeader, setImageSrc, toggleHeaderProfile} from "../header-slice";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {images} from "../../../assets/avatars/images";
import Box from "@mui/material/Box";
import {useTheme} from "@mui/material";

export const HeaderModalProfile = () => {
    const dispatch = useAppDispatch();
    const theme = useTheme();
    const {open} = useAppSelector(selectHeader);

    const handleClose = useCallback(() => {
        dispatch(toggleHeaderProfile(false));
    }, [dispatch]);

    const handleClickAvatar = useCallback((event: React.MouseEvent<HTMLImageElement>) => {
        const imageSrc = (event.target as HTMLImageElement).src;
        dispatch(setImageSrc(imageSrc));
        dispatch(toggleHeaderProfile(false));
    }, [dispatch])

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth={true}
            maxWidth="sm"
            PaperProps={{
                component: 'div',
                onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                    event.preventDefault();
                    handleClose();
                },
                sx: {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: "1rem",
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
                    justifyContent: "center",
                    backgroundColor: theme.palette.primary.main,
                    width: "100%"
                }}
            >
                Select an avatar for your profile
            </DialogTitle>

            <DialogContent
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    gap: 2,
                    maxHeight: "55vh",
                }}
            >
                {images.map((image, index) => (
                    <Box
                        key={`image ${index}`}
                        sx={{
                            flex: "0 0 22%",
                            height: "auto",
                        }}
                    >
                        <Box
                            component="img"
                            src={image}
                            alt={`Avatar ${index}`}
                            onClick={handleClickAvatar}
                            sx={{
                                width: "100%",
                                height: "auto",
                                border: "1px solid gray",
                                borderRadius: "4rem",
                                backgroundColor: theme.palette.primary.dark
                            }}
                        />
                    </Box>
                ))}
            </DialogContent>
        </Dialog>
    );
}