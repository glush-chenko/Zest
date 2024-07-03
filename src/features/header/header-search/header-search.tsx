import React, {useCallback, useEffect, useRef} from "react";
import {alpha, styled} from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import {useNavigate, createSearchParams, Form} from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import {Autocomplete, FilterOptionsState, Slide, useTheme} from "@mui/material";
import {selectTasks, Task} from "../../../components/task/task-slice";
import {useAppSelector} from "../../../app/hooks";
import TextField from "@mui/material/TextField";
import {selectTodoistCompletedTasks, selectTodoistTasks} from "../../../api/todoist-api";
import {token} from "../../../utils/auth";
import {selectScreenSizes} from "../../screen-slice";
import Fade from '@mui/material/Fade';
import Collapse from "@mui/material/Collapse";

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
    [theme.breakpoints.up('md')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 1),
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledAutocomplete = styled(Autocomplete<Task>)(({theme}) => ({
    '& .MuiInputBase-root': {
        color: 'inherit',
        width: '100%',
        padding: 0,
        "& .MuiOutlinedInput-notchedOutline": {
            border: 'none',
        },
        '& .MuiInputBase-input': {
            transition: theme.transitions.create('width'),
            [theme.breakpoints.up('md')]: {
                width: '10ch',
                '&:focus': {
                    width: '15ch',
                },
            },
            [theme.breakpoints.down('md')]: {
                width: '5ch',
                '&:focus': {
                    width: '15ch',
                },
            },
            [theme.breakpoints.down('sm')]: {
                width: 0,
                '&:focus': {
                    width: '5ch',
                },
            },
        },
    },
}));

export const HeaderSearch = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const autocompleteRef = useRef<HTMLDivElement | null>(null);
    const searchRef = useRef(null);

    const {tasks} = useAppSelector(selectTasks);
    const activeTasksAPI = useAppSelector(selectTodoistTasks);
    const completedTasksAPI = useAppSelector(selectTodoistCompletedTasks);
    const screenSizes = useAppSelector(selectScreenSizes);
    const tasksAPI = [...activeTasksAPI, ...completedTasksAPI];

    const [currentSearchQuery, setCurrentSearchQuery] = React.useState('');
    const [currentTask, setCurrentTask] = React.useState<Task | null>(null);
    const [showOptions, setShowOptions] = React.useState(false);
    const [searchToggle, setSearchToggle] = React.useState(false);

    useEffect(() => {
        if (screenSizes.isMedium) {
            setSearchToggle(true);
        } else {
            setSearchToggle(false);
        }
    }, [screenSizes]);

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

    const handleSearchToggle = useCallback(() => {
        setSearchToggle((prevState) => !prevState);
    }, []);

    const handleAutocompleteBlur = useCallback(() => {
        if (screenSizes.isMedium) {
            if (!autocompleteRef.current?.contains(document.activeElement)) {
                setSearchToggle(true);
            }
        }
    }, [autocompleteRef, screenSizes]);

    return (
        <>
            {searchToggle ? (
                <Fade in={searchToggle} timeout={350}>
                    <IconButton type="submit" aria-label="search" sx={{cursor: 'pointer'}} onClick={handleSearchToggle}>
                        <SearchIcon sx={{color: theme.palette.primary.contrastText}}/>
                    </IconButton>
                </Fade>
            ) : (
                // <Collapse in={!searchToggle} timeout={350} collapsedSize={40} orientation="horizontal">
                    <Search>
                        <SearchIconWrapper>
                            <IconButton type="submit" aria-label="search" sx={{cursor: "pointer"}}
                                        onClick={onSearchHandler}>
                                <SearchIcon sx={{color: theme.palette.primary.contrastText}}/>
                            </IconButton>
                        </SearchIconWrapper>

                        <Form onSubmit={onSearchHandler}>
                            <StyledAutocomplete
                                ref={autocompleteRef}
                                onBlur={handleAutocompleteBlur}
                                value={currentTask}
                                onChange={(event: any, newValue: Task | null) => {
                                    setCurrentTask(newValue);
                                    setCurrentSearchQuery(newValue?.name ?? "");
                                    if (newValue) {
                                        onAutoComplete(newValue)
                                    }
                                }}
                                onInputChange={(_, newInputValue, reason) => {
                                    setCurrentSearchQuery(newInputValue);
                                }}
                                options={token ? tasksAPI : tasks}
                                filterOptions={filterOptions}
                                getOptionLabel={(option: Task) => option.name}
                                open={!!currentSearchQuery && showOptions}
                                onOpen={() => {
                                    setShowOptions(true);
                                }}
                                clearOnBlur={false}
                                clearOnEscape
                                onClose={() => {
                                    setShowOptions(false);
                                }}
                                autoComplete
                                renderInput={(params) => (
                                    <TextField {...params} autoFocus aria-label="search-panel"/>
                                )}
                            />
                        </Form>
                    </Search>
                // </Collapse>
            )}
        </>
    )
}