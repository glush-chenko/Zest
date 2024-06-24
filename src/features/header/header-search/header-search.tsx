import React, {useCallback} from "react";
import {alpha, styled} from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import {useNavigate, createSearchParams, Form} from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import {Autocomplete, FilterOptionsState, useTheme} from "@mui/material";
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

const StyledAutocomplete = styled(Autocomplete<Task>)(({ theme }) => ({
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
    const [currentSearchQuery, setCurrentSearchQuery] = React.useState('');
    const [currentTask, setCurrentTask] = React.useState<Task | null>(null);
    const [showOptions, setShowOptions] = React.useState(false);

    const onSearchHandler = useCallback((e: React.FormEvent) => {
        e.preventDefault();

        if (currentSearchQuery) {
            const query = createSearchParams({
                name: currentSearchQuery
            });

            navigate({
                pathname: "/search",
                search: `?${query}`
            })
        }
    }, [currentSearchQuery]);

    const onAutoComplete = useCallback((task: Task) => {
        const query = createSearchParams({
            id: task.id
        });

        navigate({
            pathname: "/search",
            search: `?${query}`
        })

    }, [])

    const filterOptions = (options: Task[], state: FilterOptionsState<Task>) => {
        return options.filter((option) => option.name.toLowerCase().includes(currentSearchQuery.toLowerCase()));
    };


    return (
        <Search>
            <SearchIconWrapper>
                <IconButton type="submit" aria-label="search" sx={{cursor: "pointer"}} onClick={onSearchHandler}>
                    <SearchIcon sx={{color: theme.palette.primary.contrastText}}/>
                </IconButton>
            </SearchIconWrapper>

            <Form onSubmit={onSearchHandler}>
                <StyledAutocomplete
                    value={currentTask}
                    onChange={(event: any, newValue: Task | null) => {
                        setCurrentTask(newValue);
                        setCurrentSearchQuery(newValue?.name ?? "");
                        if (newValue) {
                            onAutoComplete(newValue)
                        }
                    }}
                    onInputChange={(_, newInputValue) => {
                        setCurrentSearchQuery(newInputValue);
                    }}
                    options={tasks}
                    filterOptions={filterOptions}
                    getOptionLabel={(option: Task) => option.name}
                    open={!!currentSearchQuery && showOptions}
                    onOpen={() => {
                        setShowOptions(true);
                    }}
                    clearOnBlur={false}
                    onClose={() => {
                        setShowOptions(false);
                    }}
                    autoComplete
                    renderInput={(params) => (
                        <TextField {...params} />
                    )}
                />
            </Form>
        </Search>
    )
}