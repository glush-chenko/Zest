import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {selectTasks} from "../../../components/task/task-slice";
import {useParams} from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const ActivityCard = () => {
    // const dispatch = useAppDispatch();
    // const {findedTask} = useAppSelector(selectTasks);
    // const { id } = useParams<{ id: string }>();
    //
    // useEffect(() => {
    //     if (id) {
    //         dispatch(findTask(id));
    //     }
    // }, [dispatch, id]);
    //
    // return (
    //     <Box>
    //         <Typography variant="h6">AAAA</Typography>
    //     </Box>
    // )
}