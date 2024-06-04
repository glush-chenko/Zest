import React, {UIEventHandler, useEffect, useState} from 'react';
import {Fade, useTheme} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import smartPeople from "../../assets/smart-people.png"
import workPeople from "../../assets/work-people.jpg"
import people from "../../assets/people.jpg"
import desktop from "../../assets/desktop.jpg"
import communityPeople from "../../assets/community-people.jpg"
import {ExtendedPaletteOptions} from "../../theme/theme-provider/theme-provider";
import {Theme} from "@mui/material/styles";

const AboutPage: React.FC = () => {
    const theme: Theme & { palette: ExtendedPaletteOptions } = useTheme();
    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = (event:  React.UIEvent<HTMLDivElement, UIEvent>) => {
        const scrollPosition = event.currentTarget.scrollTop;
        // const windowHeight = window.innerHeight;
        console.log(scrollPosition)

        if (scrollPosition > 30) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };
    //
    // useEffect(() => {
    //     const handleScroll = () => {
    //         const scrollPosition = window.scrollY;
    //         const windowHeight = window.innerHeight;
    //         console.log(scrollPosition)
    //
    //         if (scrollPosition > 100) {
    //             setIsVisible(true);
    //         } else {
    //             setIsVisible(false);
    //         }
    //     };
    //
    //     window.addEventListener('scroll', handleScroll);
    //
    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     };
    // }, [window]);


    return (
        <Box
            sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "1rem",
            height: "100%",
            overflow: "auto",
            backgroundColor: theme.palette.beige.main,
        }}
        onScroll={handleScroll}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "1rem 5rem",
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
                    height: "30rem",
                    width: "40rem",
                    border: "1px solid",
                    borderRadius: "7rem",
                    marginBottom: "5rem"
                }}
            />

            <Box
                sx={{
                    display: "flex",
                    // overflow: 'auto',
                    flexDirection: "column",
                    gap: "2rem",
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
                    transition: 'opacity 0.5s, transform 0.5s',
                }}
            >

                <Fade in={isVisible}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '2rem',
                        }}
                    >
                        <Box
                            component="img"
                            src={workPeople}
                            alt="smart people"
                            sx={{
                                height: "15rem",
                                width: "15rem",
                                border: "1px solid",
                                borderRadius: "3rem",
                            }}
                        />
                        <Typography variant="body1">Variant</Typography>
                    </Box>
                </Fade>

                <Box
                    component="img"
                    src={communityPeople}
                    alt="smart people"
                    sx={{
                        height: "15rem",
                        width: "15rem",
                        border: "1px solid",
                        borderRadius: "3rem",
                    }}
                />
                <Box
                    component="img"
                    src={desktop}
                    alt="smart people"
                    sx={{
                        height: "15rem",
                        width: "15rem",
                        border: "1px solid",
                        borderRadius: "3rem",
                    }}
                />
            </Box>

        </Box>
    )
}

export default AboutPage;