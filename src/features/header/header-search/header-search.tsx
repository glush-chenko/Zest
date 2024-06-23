import React, {useCallback, useEffect, useMemo} from "react";
import {alpha, styled} from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import {useNavigate, createSearchParams, Form} from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import {Autocomplete, AutocompleteProps, FilterOptionsState, useTheme} from "@mui/material";
import {selectTasks, Task} from "../../../components/task/task-slice";
import {useAppSelector} from "../../../app/hooks";
import TextField from "@mui/material/TextField";

const Search = styled('div')(({theme}) => ({
    display: 'flex',
    position: 'relative',
    borderRadius: "2rem",
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 1),
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const StyledAutocomplete = styled(Autocomplete)<{ options: Task[] }>(({ theme }) => ({
    '& .MuiInputBase-root': {
        color: 'inherit',
        width: '100%',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
    },
}));

export const HeaderSearch = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const {tasks} = useAppSelector(selectTasks);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [currentSearchQuery, setCurrentSearchQuery] = React.useState('');
    const [currentTaskName, setCurrentTaskName] = React.useState<string | null>(tasks[0].name);
    const [showOptions, setShowOptions] = React.useState(false);

    // console.log("1", currentSearchQuery)
    // console.log("2",tasks[0].name)
    // console.log("3",tasks[0].name.toLowerCase().includes(currentSearchQuery.toLowerCase()))
    //
    const newArr = useMemo(() => {
        return tasks.filter((task) => {
            return task.name.toLowerCase().includes(currentSearchQuery.toLowerCase());
        });
    }, [tasks, currentSearchQuery])

    // console.log(newArr)

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }

        if (!currentSearchQuery.length) {
            navigate("/tasks");
        }
    }, [currentSearchQuery, inputRef]);

    const onSearchHandler = useCallback((e: React.FormEvent) => {
        e.preventDefault();

        const searchQuery = {
            name: currentSearchQuery
        }

        const query = createSearchParams(searchQuery);
        navigate({
            pathname: "/search",
            search: `?${query}`
        })
    }, [currentSearchQuery])

    const filterOptions = (options: Task[], state: FilterOptionsState<Task>) => {
        // return options.filter((option) =>
        //     option.name.toLowerCase().startsWith(state.inputValue.toLowerCase())
        // );

        return options.filter((option) => option.name.toLowerCase().includes(state.inputValue.toLowerCase()));
    };


    return (
        <Search>
            <SearchIconWrapper>
                <IconButton type="submit" aria-label="search" sx={{cursor: "pointer"}} onClick={onSearchHandler}>
                    <SearchIcon sx={{color: theme.palette.primary.contrastText}}/>
                </IconButton>
            </SearchIconWrapper>

            {/*<Form onSubmit={onSearchHandler}>*/}
            {/*    <StyledAutocomplete*/}
            {/*        value={currentTaskName}*/}
            {/*        onChange={(event, value, reason, details) => {*/}
            {/*            setCurrentTaskName(value as string | null);*/}
            {/*            setShowOptions(false);*/}
            {/*        }}*/}
            {/*        inputValue={currentSearchQuery}*/}
            {/*        onInputChange={(_, newInputValue) => {*/}
            {/*            setCurrentSearchQuery(newInputValue);*/}
            {/*            // setCurrentTask(tasks.find((task) => task.name === newInputValue) || null);*/}
            {/*        }}*/}
            {/*        options={newArr}*/}
            {/*        disablePortal*/}
            {/*        getOptionLabel={(option) => (option as Task).name}*/}
            {/*        open={showOptions}*/}
            {/*        renderInput={(params) => (*/}
            {/*            <TextField {...params} label="Controllable" />*/}
            {/*            // <InputBase*/}
            {/*            //     {...params}*/}
            {/*            //     ref={inputRef}*/}
            {/*            //     placeholder="Search…"*/}
            {/*            //     // inputProps={{ 'aria-label': 'search' }}*/}
            {/*            //     onChange={(e) => setCurrentSearchQuery(e.target.value)}*/}
            {/*            // />*/}
            {/*            // <StyledInputBase*/}
            {/*            //     ref={inputRef}*/}
            {/*            //     placeholder="Search…"*/}
            {/*            //     inputProps={{'aria-label': 'search'}}*/}
            {/*            //     onChange={(e) => setCurrentSearchQuery(e.target.value)}*/}
            {/*            // />*/}
            {/*        )}*/}
            {/*    />*/}

                <StyledInputBase
                    placeholder="Search…"
                    inputProps={{'aria-label': 'search'}}
                    onChange={(e) => setCurrentSearchQuery(e.target.value)}
                />
            {/*</Form>*/}
        </Search>
    )
}