import React from "react";
// import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
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
import {LeftSection} from "../../main/left-section/left-section";
import {selectDrawerOpen} from "../../main/left-section/left-section-slice";
import {RightSection} from "../../main/right-section/right-section";

const PAGES = ['Home', 'About', 'Ideas', 'Notes', 'Contact'];
const SETTINGS = ['Profile', 'Progress', 'Dashboard'];

export const Navigation = () => {
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const drawer = useAppSelector(selectDrawerOpen);
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);


    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleChangeTheme = () => {
        dispatch(toggleTheme());
    }

    return (
        <AppBar position="static" open={drawer}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <LeftSection />
                    <Box
                        component="img"
                        src={theme.palette.mode === "dark" ? logo : logo2}
                        alt="Logo"
                        width="8rem"
                        height="3rem"
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            marginRight: '1rem',
                        }}
                    >
                    </Box>

                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}} />
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
                        {PAGES.map((page) => (
                            <Button
                                key={page}
                                // onClick={}
                                sx={{my: 2, color: 'white', display: 'block', margin: 0}}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

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

                    <Box sx={{flexGrow: 0}}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg"/>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{mt: '3rem'}}
                            id="menu-appbar"
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
                            {SETTINGS.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
            <RightSection />
        </AppBar>
    )
}