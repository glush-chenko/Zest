import React from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface AlertDialogProps {
    title: string;
    text: string;
    successButtonText?: string;
    cancelButtonText?: string;
    onCancel: () => void;
    onSuccess: () => void;
}

export const AlertDialog = (props: AlertDialogProps) => {
    const {
        title,
        text,
        successButtonText = "done",
        cancelButtonText = "cancel",
        onCancel,
        onSuccess
    } = props;

    return (
        <Dialog
            open
            onClose={onCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle>
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {text}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel}>{cancelButtonText}</Button>
                <Button onClick={onSuccess}>{successButtonText}</Button>
            </DialogActions>
        </Dialog>
    )
}