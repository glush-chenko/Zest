import { render, screen, fireEvent } from '@testing-library/react';
import {AlertDialog} from "../components/generic/alert-dialog";

describe('AlertDialog', () => {
    it('should render the dialog with the provided title and text', () => {
        const onCancel = jest.fn();
        const onSuccess = jest.fn();

        render(
            <AlertDialog
                title="Confirmation"
                text="Are you sure you want to proceed?"
                onCancel={onCancel}
                onSuccess={onSuccess}
            />
        );

        expect(screen.getByText('Confirmation')).toBeInTheDocument();
        expect(screen.getByText('Are you sure you want to proceed?')).toBeInTheDocument();
    });

    it('should call the onCancel function when the cancel button is clicked', () => {
        const onCancel = jest.fn();
        const onSuccess = jest.fn();

        render(
            <AlertDialog
                title="Confirmation"
                text="Are you sure you want to proceed?"
                onCancel={onCancel}
                onSuccess={onSuccess}
            />
        );

        const cancelButton = screen.getByText('cancel');
        fireEvent.click(cancelButton);

        expect(onCancel).toHaveBeenCalled();
        expect(onSuccess).not.toHaveBeenCalled();
    });

    it('should call the onSuccess function when the success button is clicked', () => {
        const onCancel = jest.fn();
        const onSuccess = jest.fn();

        render(
            <AlertDialog
                title="Confirmation"
                text="Are you sure you want to proceed?"
                onCancel={onCancel}
                onSuccess={onSuccess}
            />
        );

        const successButton = screen.getByText('done');
        fireEvent.click(successButton);

        expect(onCancel).not.toHaveBeenCalled();
        expect(onSuccess).toHaveBeenCalled();
    });

    it('should use the provided button text if available', () => {
        const onCancel = jest.fn();
        const onSuccess = jest.fn();

        render(
            <AlertDialog
                title="Confirmation"
                text="Are you sure you want to proceed?"
                successButtonText="Confirm"
                cancelButtonText="Cancel"
                onCancel={onCancel}
                onSuccess={onSuccess}
            />
        );

        expect(screen.getByText('Cancel')).toBeInTheDocument();
        expect(screen.getByText('Confirm')).toBeInTheDocument();
    });
});