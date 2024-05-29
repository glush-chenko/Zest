import React, {useCallback} from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import {TaskCard} from "../../../components/task/task-cards-list/task-card/task-card";
import Dialog from "@mui/material/Dialog";
import {selectHeader, setImageSrc, toggleHeaderProfile} from "../header-slice";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {images} from "../../../assets/avatars/images";

export const HeaderModalProfile = () => {
    const dispatch = useAppDispatch();
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
            }}
        >
            <DialogTitle>Select an avatar for your profile</DialogTitle>

            <DialogContent
                sx={{display: "flex", flexDirection: "row", gap: "5rem", padding: "0 3rem"}}
            >
                {images.map((image, index) => (
                    <img key={index} src={image} alt={`Image ${index}`} onClick={handleClickAvatar}/>
                ))}
            </DialogContent>
        </Dialog>
    );
}