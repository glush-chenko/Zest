import {combineReducers} from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import themeReducer from "../theme/theme-provider/theme-provider-slice";
import leftSectionReducer from "../features/main/left-section/left-section-slice";
import rightSectionReducer from "../features/main/right-section/right-section-slice";
import taskReducer from "../components/task/task-slice";
import headerReducer from "../features/header/header-slice";
import todoistReducer from "../api/todoist-api";
import screenReducer from "../features/screen-slice"

const rootReducer = combineReducers({
    counter: counterReducer,
    themeSlice: themeReducer,
    leftSectionSlice: leftSectionReducer,
    rightSectionSlice: rightSectionReducer,
    taskSlice: taskReducer,
    headerSlice: headerReducer,
    todoistSlice: todoistReducer,
    screenSlice: screenReducer,
});

export default rootReducer;