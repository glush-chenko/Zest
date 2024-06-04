import React, {useCallback} from "react";
import Dialog from "@mui/material/Dialog";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {selectHeader, toggleHeaderProductivity} from "../header-slice";
import {useTheme} from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Stack from '@mui/material/Stack';
import { HighlightItemData } from '@mui/x-charts/context';
import { BarChart, BarChartProps } from '@mui/x-charts/BarChart';
import { PieChart, PieChartProps } from '@mui/x-charts/PieChart';
import Box from "@mui/material/Box";

const barChartsProps: BarChartProps = {
    series: [
        {
            data: [3, 4, 1, 5, 2],
            id: 'sync',
            highlightScope: { highlighted: 'item', faded: 'global' },
        },
    ],
    xAxis: [{ scaleType: 'band', data: ['A', 'B', 'C', 'D', 'E'] }],
    height: 400,
    slotProps: {
        legend: {
            hidden: true,
        },
    },
};

const pieChartProps: PieChartProps = {
    series: [
        {
            id: 'sync',
            data: [
                { value: 3, label: 'A', id: 'A' },
                { value: 4, label: 'B', id: 'B' },
                { value: 1, label: 'C', id: 'C' },
                { value: 3, label: 'D', id: 'D' },
                { value: 5, label: 'E', id: 'E' },
            ],
            highlightScope: { highlighted: 'item', faded: 'global' },
        },
    ],
    height: 400,
    slotProps: {
        legend: {
            hidden: true,
        },
    },
};

export const HeaderModalProductivity = () => {
    const dispatch = useAppDispatch();
    const {productivityOpen} = useAppSelector(selectHeader);
    const theme = useTheme();
    const [highlightedItem, setHighLightedItem] =
        React.useState<HighlightItemData | null>(null);

    const handleClose = useCallback(() => {
        dispatch(toggleHeaderProductivity(false));
    }, [dispatch]);

    return (
        <Dialog
            open={productivityOpen}
            onClose={handleClose}
            fullWidth={true}
            maxWidth="md"
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
                    justifyContent: "left",
                    // backgroundColor: theme.palette.primary.main,
                    width: "100%"
                }}
            >
                Productivity
            </DialogTitle>

                <Stack
                    direction={{ xs: 'row', xl: 'row' }}
                    spacing={1}
                    sx={{ width: '100%' }}
                >
                    <BarChart
                        {...barChartsProps}
                        highlightedItem={highlightedItem}
                        onHighlightChange={setHighLightedItem}
                    />
                    <PieChart
                        {...pieChartProps}
                        highlightedItem={highlightedItem}
                        onHighlightChange={setHighLightedItem}
                    />
                </Stack>
        </Dialog>
    );
}