import React, {useCallback, useEffect, useMemo} from "react";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {ClickAwayListener, FormControlLabel, useTheme} from "@mui/material";
import {ThemeSwitch} from "../../../components/styled/theme-switch";
import logo from "../../../assets/zest-logo.png"
import logo2 from "../../../assets/zest-logo2.png"
import {useAppDispatch, useAppSelector, useSnackbarWithAction} from "../../../app/hooks";
import {toggleTheme} from "../../../theme/theme-provider/theme-provider-slice";
import {AppBar} from "../../../components/styled/app-bar";
import {selectDrawerOpen} from "../../main/left-section/left-section-slice";
import {NavLink, useLocation} from "react-router-dom";
import {selectHeader, setAvatarSrc, setGoalForDay} from "../header-slice";
import {selectTasks} from "../../../components/task/task-slice";
import {selectRightSection} from "../../main/right-section/right-section-slice";
import {HeaderSearch} from "../header-search/header-search";
import Skeleton from '@mui/material/Skeleton';
import {selectTodoistCompletedTasks} from "../../../api/todoist-api";
import dayjs from "dayjs";
import {token} from "../../../utils/auth";
import MenuIcon from '@mui/icons-material/Menu';

enum SETTINGS {
    PROFILE = 'Profile',
    PRODUCTIVITY = "Productivity",
}

const PAGES = ["Home", 'Tasks', 'Activity', 'About'];
const SETTINGS_MENU_ITEMS = [SETTINGS.PROFILE, SETTINGS.PRODUCTIVITY];

interface NavigationProps {
    isLoggedIn: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({isLoggedIn}) => {
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const location = useLocation();
    const {enqueueSnackbar, closeSnackbar} = useSnackbarWithAction();

    const drawer = useAppSelector(selectDrawerOpen);
    const {tasks} = useAppSelector(selectTasks);
    const completedTasksAPI = useAppSelector(selectTodoistCompletedTasks);
    const {selectedDate} = useAppSelector(selectRightSection);
    const {avatarSrc, goalForDay} = useAppSelector(selectHeader);

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [anchorElPage, setAnchorElPage] = React.useState<null | HTMLElement>(null);

    const completedTasksForDay = useMemo(() => {
        if (token) {
            return completedTasksAPI.filter((t) => dayjs(t.completedAt).startOf("day").valueOf() === selectedDate).length;
        } else {
            return tasks.filter((t) => t.completed && t.scheduledDate === selectedDate).length;
        }
    }, [completedTasksAPI, selectedDate, tasks, token]);

    useEffect(() => {
        const savedAvatar = localStorage.getItem('avatarSrc');
        if (savedAvatar) {
            dispatch(setAvatarSrc(savedAvatar));
        }

        const savedGoal = localStorage.getItem('goal');
        if (savedGoal) {
            dispatch(setGoalForDay(Number(savedGoal)));
        }

        if (completedTasksForDay === goalForDay) {
            enqueueSnackbar("You have successfully completed all the tasks for today", () => {
                closeSnackbar();
            }, "Close");
        }
    }, [dispatch, completedTasksForDay, goalForDay]);

    const handleOpenUserMenu = useCallback((event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    }, []);

    const handleOpenPageMenu = useCallback((event: React.MouseEvent<HTMLElement>) => {
        setAnchorElPage(event.currentTarget);
    }, []);

    const handleCloseUserMenu = useCallback(() => {
        setAnchorElUser(null);
    }, []);

    const handleClosePageMenu = useCallback(() => {
        setAnchorElPage(null);
    }, []);

    const handleChangeTheme = useCallback(() => {
        dispatch(toggleTheme());
    }, [dispatch]);

    return (
        <AppBar
            position="static"
            open={drawer}
            sx={{
                boxShadow: "none",
                // backgroundColor: theme.palette.mode === "dark" ? theme.palette.grey[900] : theme.palette.secondary.main
            }}
        >
            <Container
                maxWidth={false}
                sx={{
                    [theme.breakpoints.down('md')]: {
                        paddingLeft: 1.25,
                        paddingRight: 1.25
                    },
                    [theme.breakpoints.down('sm')]: {
                        paddingLeft: 0.75,
                        paddingRight: 0.75
                    },
                }}
            >
                <Toolbar disableGutters>
                    <Box
                        component="img"
                        src={theme.palette.mode === "dark" ? logo : logo2}
                        alt="Logo"
                        width="8rem"
                        height="3rem"
                        sx={{
                            display: {xs: 'none', md: 'flex'},
                            marginRight: '1rem',
                        }}
                    >
                    </Box>

                    <Box sx={{flexGrow: 0}}>
                        <Tooltip title="Open pages">
                            <IconButton
                                size="large"
                                color="inherit"
                                aria-label="open page"
                                sx={{display: {xs: 'flex', md: 'none'}}}
                                onClick={handleOpenPageMenu}
                            >
                                <MenuIcon/>
                            </IconButton>
                        </Tooltip>

                        <Menu
                            sx={{mt: '3rem', display: {xs: 'flex', md: 'none'}}}
                            anchorEl={anchorElPage}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            open={Boolean(anchorElPage)}
                            onClose={handleClosePageMenu}
                        >
                            {PAGES.map((page) => (
                                <NavLink
                                    to={page === 'Home' ? '/' : `/${page.toLowerCase()}`}
                                    style={{
                                        textDecoration: 'none',
                                        color: 'inherit'
                                    }}
                                    key={`navigation-link-${page}`}
                                >
                                    <MenuItem
                                        key={`navigation-link-${page}`}
                                        onClick={handleClosePageMenu}
                                    >
                                        <Typography textAlign="center">{page}</Typography>
                                    </MenuItem>
                                </NavLink>
                            ))}
                        </Menu>
                    </Box>

                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        {PAGES.map((page) => (
                            <NavLink
                                to={page === 'Home' ? "/" : `/${page.toLowerCase()}`}
                                style={{
                                    textDecoration: 'none',
                                    color: 'inherit'
                                }}
                                key={`navigation-link-${page}`}
                            >
                                <Button
                                    sx={{
                                        [theme.breakpoints.down('md')]: {
                                            fontSize: "smaller",
                                            minWidth: 0,
                                            fontWeight: "normal"
                                        },
                                        my: 2,
                                        color: theme.palette.common.white,
                                        display: 'block',
                                        margin: 0
                                    }}
                                >
                                    {page}
                                </Button>
                            </NavLink>
                        ))}
                    </Box>

                    <Box
                        sx={{
                            display: {xs: 'flex', md: 'none'},
                            alignItems: "center",
                            justifyContent: "center",
                            flexGrow: 1,
                            [theme.breakpoints.down('sm')]: {
                                justifyContent: "flex-start",
                                marginLeft: "1rem"
                            },
                        }}
                    >
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            Zest
                        </Typography>
                    </Box>

                    <Box sx={{display: "flex", gap: "1rem"}}>
                        <HeaderSearch/>

                        <FormControlLabel
                            control={
                                <ThemeSwitch
                                    checked={theme.palette.mode === 'dark'}
                                    onChange={handleChangeTheme}
                                    name="theme-toggle"
                                    color="primary"
                                />
                            }
                            aria-label={theme.palette.mode === 'dark' ? 'Dark Theme' : 'Light Theme'}
                            label=""
                            sx={{margin: 0}}
                        />

                        <Box sx={{flexGrow: 0}}>
                            <Tooltip title="Open settings">
                                {isLoggedIn ? (
                                    <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                        <Avatar src={avatarSrc} alt="avatar image"/>
                                    </IconButton>
                                ) : (
                                    <Skeleton variant="circular" width={40} height={40}/>
                                )}
                            </Tooltip>

                            <Menu
                                sx={{mt: '3rem'}}
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {SETTINGS_MENU_ITEMS.map((setting, index) => (
                                    <NavLink
                                        state={{
                                            previousRoute: location.pathname,
                                        }}
                                        to={`/${setting.toLowerCase()}`}
                                        style={{
                                            textDecoration: 'none',
                                            color: 'inherit'
                                        }}
                                        key={`navigation-link-${setting}`}
                                    >
                                        <MenuItem
                                            key={index}
                                            onClick={handleCloseUserMenu}
                                        >
                                            <Typography textAlign="center">{setting}</Typography>
                                        </MenuItem>
                                    </NavLink>
                                ))}
                            </Menu>
                        </Box>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}