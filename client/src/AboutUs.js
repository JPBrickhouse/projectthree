import React from 'react';
import { makeStyles, ThemeProvider, createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import { Box, Container, Grid, CssBaseline, BottomNavigation } from "@material-ui/core";
import 'fontsource-roboto';

import AboutUsIndividualCard from "./components/AboutUsIndividualCard/AboutUsIndividualCard"

import CreatorData from "./data/about-data.json"

const AboutUs = () => {
    // Material UI theme constant
    let theme = createMuiTheme({
        palette: {
            primary: {
                light: '#9A8C98',
                main: '#4A4E69',
                text: '#22223B'
            },
            secondary: {
                main: '#C9ADA7'
            }
        },
        breakpoints: {
            values: {
                xs: 0,
                sm: 600,
                md: 960,
                lg: 1280,
                xl: 1920,
            },
        },

    });
    theme = responsiveFontSizes(theme);

    // useStyles const for beginning styles
    const useStyles = makeStyles(() => ({
        grid: {
            width: '100%',
            margin: 0,
        },
        root: {
            minHeight: '100vh',
            border: 0,
            backgroundImage: `url(${process.env.PUBLIC_URL + '/images/dc-img-4.jpg'})`,
            backgroundPosition: 'left top',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            zIndex: '-1',
        },
        container: {
            margin: 0,
            alignContent: 'center',
        },
        footer: {
            background: "#1d3557",
        },
    }))
    const classes = useStyles();

    return (
        <div>
            <ThemeProvider theme={theme}>
                <div className="App"
                    style={{ width: '100%' }}
                >
                    <Box display="flex" flexDirection="row" p={1}>
                        <Box p={1} flexShrink={1} flexGrow={1}>
                            <div className={classes.root}>
                                <CssBaseline />
                                <Container
                                    maxWidth="xl"
                                    className={classes.container}>
                                    <Grid container
                                        spacing={2}
                                        direction="row"
                                        justify="flex-start"
                                        alignItems="flex-start">
                                        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                            {CreatorData.map(eachPerson =>
                                                <AboutUsIndividualCard
                                                    key={eachPerson.firstName}
                                                    firstName={eachPerson.firstName}
                                                    lastName={eachPerson.lastName}
                                                    githubPicURL={eachPerson.githubPicURL}
                                                    linkedIn={eachPerson.linkedIn}
                                                    github={eachPerson.github}
                                                    portfolio={eachPerson.portfolio}
                                                />
                                            )}
                                        </Grid>
                                    </Grid>
                                </Container>
                            </div>

                            <BottomNavigation className={classes.footer}>
                                Potential Footer
                            </BottomNavigation>

                        </Box>
                    </Box>
                </div>
            </ThemeProvider>
        </div>
    );
}

export default AboutUs;