import React, {useCallback, useEffect} from "react";
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
import {FormControlLabel, useTheme} from "@mui/material";
import {ThemeSwitch} from "../../../components/styled/theme-switch";
import logo from "../../../assets/zest-logo.png"
import logo2 from "../../../assets/zest-logo2.png"
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {toggleTheme} from "../../../theme/theme-provider/theme-provider-slice";
import {AppBar} from "../../../components/styled/app-bar";
import {selectDrawerOpen} from "../../main/left-section/left-section-slice";
import {NavLink, useLocation} from "react-router-dom";
import {selectHeader, setImageSrc, toggleHeaderProductivity, toggleHeaderProfile} from "../header-slice";

const PAGES = ['tasks', 'about', 'ideas', 'contact'];
const SETTINGS = ['Profile', 'Productivity', 'Dashboard'];

export const Navigation = () => {
    const location = useLocation();
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const drawer = useAppSelector(selectDrawerOpen);
    const {src} = useAppSelector(selectHeader);
    // const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    useEffect(() => {
        const savedAvatar = localStorage.getItem('avatarSrc');
        if (savedAvatar) {
            dispatch(setImageSrc(savedAvatar));
        }
    }, [dispatch]);

    // const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    //     setAnchorElNav(event.currentTarget);
    // };
    const handleOpenUserMenu = useCallback((event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
        dispatch(toggleHeaderProfile(false));
        // dispatch(toggleHeaderProductivity(false));
    }, [dispatch]);

    // const handleCloseNavMenu = () => {
    //     setAnchorElNav(null);
    // };

    const handleCloseUserMenu = useCallback((event: React.MouseEvent<HTMLElement>) => {
        const text = (event.target as HTMLElement).textContent;
        if (text === "Profile") {
            dispatch(toggleHeaderProfile(true));
        } else if (text === "Productivity") {
            dispatch(toggleHeaderProductivity(true));
        }
        setAnchorElUser(null);
    }, [dispatch]);

    const handleChangeTheme = useCallback(() => {
        dispatch(toggleTheme());
    }, [dispatch]);

    return (
        <AppBar
            position="static"
            open={drawer}
            sx={{
                boxShadow: "none"
            }}
        >
            <Container maxWidth={false}>
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

                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}/>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: {xs: 'flex', md: 'none'},
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Zest
                    </Typography>

                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        <NavLink to="/" style={{textDecoration: 'none'}}>
                            <Button sx={{my: 2, color: 'white', display: 'block', margin: 0}}>
                                Home
                            </Button>
                        </NavLink>
                        {PAGES.map((page) => (
                            <NavLink
                                to={`/${page}`}
                                style={{
                                    textDecoration: 'none',
                                }}
                                key={`navigation-link-${page}`}
                            >
                                <Button
                                    // onClick={}
                                    sx={{my: 2, color: theme.palette.common.white, display: 'block', margin: 0}}
                                >
                                    {page}
                                </Button>
                            </NavLink>
                        ))}
                    </Box>

                    {!(location && location.pathname === "/about") && (
                        <FormControlLabel
                            control={
                                <ThemeSwitch
                                    checked={theme.palette.mode === 'dark'}
                                    onChange={handleChangeTheme}
                                    name="theme-toggle"
                                    color="primary"
                                />
                            }
                            label=""
                        />
                    )}

                    <Box sx={{flexGrow: 0}}>
                        {!(location && location.pathname === "/about") && (<Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                <Avatar src={src}/>
                            </IconButton>
                        </Tooltip>)}
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
                            {SETTINGS.map((setting, index) => (
                                <MenuItem
                                    key={index}
                                    onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}