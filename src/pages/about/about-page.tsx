import React, {useState} from 'react';
import {Fade, useTheme} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import smartPeople from "../../assets/smart-people.png"
import workPeople from "../../assets/work-people.jpg"
import people from "../../assets/people.jpg"
import desktop from "../../assets/desktop.jpg"
import communityPeople from "../../assets/community-people.jpg"

const AboutPage: React.FC = () => {
    const theme = useTheme();
    const [isVisible, setIsVisible] = useState(false);
    const [isVisibleTwoSection, setIsVisibleTwoSection] = useState(false);
    const [isVisibleThreeSection, setIsVisibleThreeSection] = useState(false);

    const handleScroll = (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const scrollPosition = event.currentTarget.scrollTop;

        if (scrollPosition > 400) {
            setIsVisible(true);
        }

        if (scrollPosition > 800) {
            setIsVisibleTwoSection(true);
        }

        if (scrollPosition > 1300) {
            setIsVisibleThreeSection(true);
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "3rem",
                height: "100%",
                overflow: "auto",
                backgroundColor: theme.palette.mode === "dark" ? "transparent" : theme.palette.beige.main,
            }}
            onScroll={handleScroll}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "1rem 5rem 3rem 5rem",
                }}
            >
                <Typography variant="h3">
                    Everything is under control:
                </Typography>
                <Typography variant="h3">
                    manage time, increase efficiency
                </Typography>
                <br/>
                <Typography
                    variant="h5"
                    color={theme.palette.grey[600]}
                >
                    More done, more time for yourself: Zest, your path to order
                </Typography>
            </Box>

            <Box
                component="img"
                src={people}
                alt="smart people"
                sx={{
                    height: "32rem",
                    width: "44rem",
                    border: theme.palette.mode === "dark" ? `3px solid ${theme.palette.secondary.light}` : `3px solid ${theme.palette.grey[500]}`,
                    borderRadius: "7rem",
                    marginBottom: "7rem"
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
                    width: "100%"
                }}
            >
                <Fade in={isVisible}>
                    <Box
                        sx={{
                            display: 'flex',
                            gap: '2rem',
                            justifyContent: "flex-start",
                            paddingLeft: "5rem",
                            paddingRight: "38rem"
                        }}
                    >
                        <Box
                            component="img"
                            src={communityPeople}
                            alt="smart people"
                            sx={{
                                height: "26rem",
                                width: "26rem",
                                border: theme.palette.mode === "dark" ? `3px solid ${theme.palette.secondary.light}` : `3px solid ${theme.palette.grey[500]}`,
                                borderRadius: "3rem",
                            }}
                        />
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                paddingTop: "2rem",
                                // gap: "1rem"
                            }}
                        >
                            <Typography variant="h3">Task Management:</Typography>
                            <Typography variant="h3">Streamlining Your Productivity.</Typography>
                            <br/>
                            <Typography variant="h5" sx={{color: theme.palette.grey[600]}}>Easily add, edit and track
                                your tasks.</Typography>
                            <br/>
                            <Typography variant="h5" sx={{color: theme.palette.grey[600]}}>Stay organized, prioritize
                                your work, and achieve your goals more efficiently from anywhere.</Typography>
                        </Box>
                    </Box>
                </Fade>

                <Fade in={isVisibleTwoSection}>
                    <Box
                        sx={{
                            display: 'flex',
                            gap: '2rem',
                            justifyContent: "flex-end",
                            paddingRight: "5rem"
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                paddingTop: "2rem",
                                // gap: "1rem"
                                paddingLeft: "35rem"
                            }}
                        >
                            <Typography variant="h3">Performance Analytics:</Typography>
                            <Typography variant="h3">Unlock Your Potential.</Typography>
                            <br/>
                            <Typography variant="h5" sx={{color: theme.palette.grey[600]}}>Track your performance
                                metrics and analyze data-driven insights to identify areas for improvement.</Typography>
                            <br/>
                            <Typography variant="h5" sx={{color: theme.palette.grey[600]}}>Use this information to make
                                informed decisions and optimize your performance to reach new heights.</Typography>
                        </Box>
                        <Box
                            component="img"
                            src={desktop}
                            alt="smart people"
                            sx={{
                                height: "26rem",
                                width: "33rem",
                                border: theme.palette.mode === "dark" ? `3px solid ${theme.palette.secondary.light}` : `3px solid ${theme.palette.grey[500]}`,
                                borderRadius: "3rem",
                            }}
                        />
                    </Box>
                </Fade>

                <Fade in={isVisibleThreeSection}>
                    <Box
                        sx={{
                            display: 'flex',
                            gap: '2rem',
                            justifyContent: "flex-start",
                            paddingLeft: "5rem"
                        }}
                    >
                        <Box
                            component="img"
                            src={workPeople}
                            alt="smart people"
                            sx={{
                                height: "26rem",
                                width: "26rem",
                                border: theme.palette.mode === "dark" ? `3px solid ${theme.palette.secondary.light}` : `3px solid ${theme.palette.grey[500]}`,
                                borderRadius: "3rem",
                            }}
                        />
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                paddingTop: "2rem",
                                // gap: "1rem"
                                paddingRight: "32rem"
                            }}
                        >
                            <Typography variant="h3">Planning and Calendar:</Typography>
                            <Typography variant="h3">Mastering Time Management.</Typography>
                            <br/>
                            <Typography variant="h5" sx={{color: theme.palette.grey[600]}}>Organize your time and
                                prioritize.</Typography>
                            <br/>
                            <Typography variant="h5" sx={{color: theme.palette.grey[600]}}>Utilize our comprehensive
                                planning and calendar features to organize your time, prioritize your tasks, and stay on
                                top of your schedule.</Typography>
                        </Box>
                    </Box>
                </Fade>
            </Box>
        </Box>
    )
}

export default AboutPage;