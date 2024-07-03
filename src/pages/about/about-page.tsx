import React, {useCallback, useState} from 'react';
import {Fade, useTheme} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import workPeople from "../../assets/work-people.jpg"
import people from "../../assets/people.jpg"
import desktop from "../../assets/desktop.jpg"
import communityPeople from "../../assets/community-people.jpg"
import TelegramIcon from '@mui/icons-material/Telegram';
import IconButton from "@mui/material/IconButton";
import EmailIcon from '@mui/icons-material/Email';
import {useAppSelector} from "../../app/hooks";
import {selectScreenSizes} from "../../features/screen-slice";
import Divider from "@mui/material/Divider";

const AboutPage: React.FC = () => {
    const theme = useTheme();

    const [isVisible, setIsVisible] = useState(false);
    const [isVisibleTwoSection, setIsVisibleTwoSection] = useState(false);
    const [isVisibleThreeSection, setIsVisibleThreeSection] = useState(false);

    const screenSizes = useAppSelector(selectScreenSizes);

    const handleScroll = useCallback((event: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const scrollPosition = event.currentTarget.scrollTop;

        if (scrollPosition > 300) {
            setIsVisible(true);
        }

        if (scrollPosition > 700) {
            setIsVisibleTwoSection(true);
        }

        if (scrollPosition > 1100) {
            setIsVisibleThreeSection(true);
        }
    }, []);

    const handleTelegramClick = useCallback(() => {
        window.open('https://t.me/empty_undead', '_blank');
    }, [window]);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "100%",
                overflow: "auto",
                backgroundColor: theme.palette.mode === "dark" ? "transparent" : theme.palette.beige.main,
                '&::-webkit-scrollbar': {
                    width: '0.6rem',
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: theme.palette.grey[500],
                    borderRadius: '4px',
                },
            }}
            onScroll={handleScroll}
        >
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "3rem 0",
                height: "100%",
                width: "100%",
                gap: "2rem",
                [theme.breakpoints.down('md')]: {
                    gap: "3rem",
                },
            }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        maxWidth: screenSizes.isSmall ? "20rem" : "100%"
                    }}
                >
                    <Typography variant="h3" sx={{
                        [theme.breakpoints.down('lg')]: {
                            fontSize: "2.5rem"
                        },
                        [theme.breakpoints.down('md')]: {
                            fontSize: "2rem"
                        },
                        textAlign: "center"
                    }}>
                        Everything is under control:
                    </Typography>
                    <Typography variant="h3" sx={{
                        [theme.breakpoints.down('lg')]: {
                            fontSize: "2.5rem"
                        },
                        [theme.breakpoints.down('md')]: {
                            fontSize: "2rem"
                        },
                        textAlign: "center"
                    }}>
                        manage time, increase efficiency
                    </Typography>
                    <br/>
                    <Typography
                        variant="h5"
                        color={theme.palette.grey[600]}
                        sx={{
                            [theme.breakpoints.down('md')]: {
                                fontSize: "1.3rem"
                            },
                            textAlign: "center"
                        }}
                    >
                        More done, more time for yourself: Zest, your path to order
                    </Typography>
                </Box>

                <Box
                    component="img"
                    src={people}
                    alt="people"
                    sx={{
                        maxHeight: "35rem",
                        border: theme.palette.mode === "dark" ? `3px solid ${theme.palette.secondary.light}` : `3px solid ${theme.palette.grey[500]}`,
                        borderRadius: "7rem",
                        marginBottom: "7rem",
                        [theme.breakpoints.down('lg')]: {
                            maxHeight: "32rem"
                        },
                        [theme.breakpoints.down('md')]: {
                            maxHeight: screenSizes.isSmall ? "18rem" : "25rem",
                            marginBottom: "5rem"
                        },
                    }}
                />

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "5rem",
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
                        transition: 'opacity 0.5s, transform 0.5s',
                        width: "100%",
                        padding: "3rem"
                    }}
                >
                    <Fade in={isVisible}>
                        <Box
                            flexDirection={{xs: 'column', md: 'row'}}
                            sx={{
                                display: 'flex',
                                gap: '2rem',
                                justifyContent: "flex-start",
                                [theme.breakpoints.down('md')]: {
                                    alignItems: "center",
                                    gap: "1rem"
                                },
                            }}
                        >
                            <Box
                                component="img"
                                src={communityPeople}
                                alt="community people"
                                sx={{
                                    maxHeight: "26rem",
                                    maxWidth: "26rem",
                                    border: theme.palette.mode === "dark" ? `3px solid ${theme.palette.secondary.light}` : `3px solid ${theme.palette.grey[500]}`,
                                    borderRadius: "3rem",
                                    [theme.breakpoints.down('lg')]: {
                                        maxHeight: "23rem"
                                    },
                                    [theme.breakpoints.down('md')]: {
                                        maxHeight: screenSizes.isSmall ? "15rem" : "20rem",
                                        maxWidth: "20rem",
                                    },
                                }}
                            />
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    paddingTop: "2rem",
                                    // maxWidth: screenSizes.isSmall ? "17rem" : "100%",
                                    [theme.breakpoints.down('md')]: {
                                        alignItems: "center",
                                        paddingTop: "1rem",
                                    },
                                }}
                            >
                                <Typography variant="h3" sx={{
                                    [theme.breakpoints.down('lg')]: {
                                        fontSize: "2.5rem"
                                    },
                                    [theme.breakpoints.down('md')]: {
                                        fontSize: screenSizes.isSmall ? "1.8rem" : "2rem"
                                    },
                                    textAlign: "center"
                                }}>
                                    Task Management:
                                </Typography>
                                <Typography variant="h3" sx={{
                                    [theme.breakpoints.down('lg')]: {
                                        fontSize: "2.5rem"
                                    },
                                    [theme.breakpoints.down('md')]: {
                                        fontSize: screenSizes.isSmall ? "1.8rem" : "2rem"
                                    },
                                    textAlign: "center"
                                }}>
                                    Streamlining Your Productivity.
                                </Typography>
                                <br/>
                                <Typography variant="h5" sx={{color: theme.palette.grey[600],
                                    [theme.breakpoints.down('md')]: {
                                        fontSize: "1.3rem"
                                    },
                                    textAlign: "center"
                                }}>
                                    Easily add, edit and track your tasks.
                                </Typography>
                                <br/>
                                <Typography variant="h5" sx={{color: theme.palette.grey[600],
                                    [theme.breakpoints.down('md')]: {
                                        fontSize: "1.3rem"
                                    },
                                    textAlign: "center"
                                }}>
                                    Stay organized, prioritize your work, and achieve your goals more efficiently from anywhere.
                                </Typography>
                            </Box>
                        </Box>
                    </Fade>

                    {screenSizes.isMedium && (<Divider />)}

                    <Fade in={isVisibleTwoSection}>
                        <Box
                            flexDirection={{xs: 'column', md: 'row'}}
                            sx={{
                                display: 'flex',
                                gap: '2rem',
                                justifyContent: "flex-end",
                                [theme.breakpoints.down('md')]: {
                                    alignItems: "center",
                                    gap: "1rem"
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    [theme.breakpoints.down('md')]: {
                                        alignItems: "center"
                                    },
                                }}
                            >
                                <Typography variant="h3" sx={{
                                    [theme.breakpoints.down('lg')]: {
                                        fontSize: "2.5rem"
                                    },
                                    [theme.breakpoints.down('md')]: {
                                        fontSize: screenSizes.isSmall ? "1.8rem" : "2rem"
                                    },
                                    textAlign: "center"
                                }}>
                                    Performance Analytics:
                                </Typography>
                                <Typography variant="h3" sx={{
                                    [theme.breakpoints.down('lg')]: {
                                        fontSize: "2.5rem"
                                    },
                                    [theme.breakpoints.down('md')]: {
                                        fontSize: screenSizes.isSmall ? "1.8rem" : "2rem"
                                    },
                                    textAlign: "center"
                                }}>
                                    Unlock Your Potential.
                                </Typography>
                                <br/>
                                <Typography variant="h5" sx={{color: theme.palette.grey[600],
                                    [theme.breakpoints.down('md')]: {
                                        fontSize: "1.3rem"
                                    },
                                    textAlign: "center"
                                }}>
                                    Track your performance metrics and analyze data-driven insights to identify areas for improvement.
                                </Typography>
                                <br/>
                                <Typography variant="h5" sx={{color: theme.palette.grey[600],
                                    [theme.breakpoints.down('md')]: {
                                        fontSize: "1.3rem"
                                    },
                                    textAlign: "center"
                                }}>
                                    Use this information to make informed decisions and optimize your performance to reach new heights.
                                </Typography>
                            </Box>
                            <Box
                                component="img"
                                src={desktop}
                                alt="desktop image"
                                sx={{
                                    maxHeight: "26rem",
                                    maxWidth: "33rem",
                                    border: theme.palette.mode === "dark" ? `3px solid ${theme.palette.secondary.light}` : `3px solid ${theme.palette.grey[500]}`,
                                    borderRadius: "3rem",
                                    [theme.breakpoints.down('lg')]: {
                                        maxWidth: "29rem",
                                    },
                                    [theme.breakpoints.down('md')]: {
                                        maxHeight: screenSizes.isSmall ? "15rem" : "20rem",
                                        maxWidth: "25rem",
                                    },
                                }}
                            />
                        </Box>
                    </Fade>

                    {screenSizes.isMedium && (<Divider />)}

                    <Fade in={isVisibleThreeSection}>
                        <Box
                            flexDirection={{xs: 'column', md: 'row'}}
                            sx={{
                                display: 'flex',
                                gap: '2rem',
                                justifyContent: "flex-start",
                                [theme.breakpoints.down('md')]: {
                                    alignItems: "center"
                                },
                            }}
                        >
                            <Box
                                component="img"
                                src={workPeople}
                                alt="work people"
                                sx={{
                                    maxHeight: "26rem",
                                    maxWidth: "26rem",
                                    border: theme.palette.mode === "dark" ? `3px solid ${theme.palette.secondary.light}` : `3px solid ${theme.palette.grey[500]}`,
                                    borderRadius: "3rem",
                                    [theme.breakpoints.down('lg')]: {
                                        maxWidth: "23rem"
                                    },
                                    [theme.breakpoints.down('md')]: {
                                        maxHeight: screenSizes.isSmall ? "15rem" : "20rem",
                                        maxWidth: "20rem",
                                    },
                                }}
                            />
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    [theme.breakpoints.down('md')]: {
                                        alignItems: "center"
                                    },
                                }}
                            >
                                <Typography variant="h3" sx={{
                                    [theme.breakpoints.down('lg')]: {
                                        fontSize: "2.5rem"
                                    },
                                    [theme.breakpoints.down('md')]: {
                                        fontSize: screenSizes.isSmall ? "1.8rem" : "2rem"
                                    },
                                    textAlign: "center"
                                }}>
                                    Planning and Calendar:
                                </Typography>
                                <Typography variant="h3" sx={{
                                    [theme.breakpoints.down('lg')]: {
                                        fontSize: "2.5rem"
                                    },
                                    [theme.breakpoints.down('md')]: {
                                        fontSize: screenSizes.isSmall ? "1.8rem" : "2rem"
                                    },
                                    textAlign: "center"
                                }}>
                                    Mastering Time Management.
                                </Typography>
                                <br/>
                                <Typography variant="h5" sx={{color: theme.palette.grey[600],
                                    [theme.breakpoints.down('md')]: {
                                        fontSize: "1.3rem"
                                    },
                                    textAlign: "center"
                                }}>
                                    Organize your time and prioritize.
                                </Typography>
                                <br/>
                                <Typography variant="h5" sx={{color: theme.palette.grey[600],
                                    [theme.breakpoints.down('md')]: {
                                        fontSize: "1.3rem"
                                    },
                                    textAlign: "center"
                                }}>
                                    Utilize our comprehensive planning and calendar features to organize your time,
                                    prioritize your tasks, and stay on
                                    top of your schedule.
                                </Typography>
                            </Box>
                        </Box>
                    </Fade>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[300],
                        minHeight: "2.5rem",
                        paddingBottom: 0,
                        width: "100%",
                        padding: "0 2rem"
                    }}>
                    <Box>
                        <IconButton
                            aria-label="telegram"
                            onClick={handleTelegramClick}
                        >
                            <TelegramIcon sx={{fontSize: "1.3rem"}}/>
                        </IconButton>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                    }}>
                        <EmailIcon sx={{fontSize: "1.3rem", color: theme.palette.grey[600]}}/>
                        <Typography sx={{color: theme.palette.grey[600],
                            [theme.breakpoints.down('sm')]: {
                                fontSize: "0.8rem"
                            },
                        }}>alena.glushchenko01@gmail.com</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}


export default AboutPage;