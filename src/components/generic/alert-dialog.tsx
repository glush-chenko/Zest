import React from "react";

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

    return
}