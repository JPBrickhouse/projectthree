import React from "react";
import Link from '@material-ui/core/Link';
import { Box, Card, CardContent, makeStyles, Typography } from "@material-ui/core";
import { createMuiTheme, ThemeProvider, responsiveFontSizes } from '@material-ui/core/styles';


function CarouselSlide(props) {
    const individualNewsArticle = props.content

    let theme = createMuiTheme();
    theme = responsiveFontSizes(theme);

    const useStyles = makeStyles(() => ({
        breakpoints: {
            values: {
                xs: 0,
                sm: 600,
                md: 960,
                lg: 1280,
                xl: 1920,
            },
        },
        root: {
            border: 0,
            display: 'flex',
            flex: '1 0 auto',

        },
        controls: {
            width: 'fit-content',
            height: 'fit-content',
            textAlign: 'center',
            alignItems: 'center',
            [theme.breakpoints.down('sm')]: {
            },
        },
        card: {
            margin: 'auto',
            transition: "0.3s",
            padding: '20px 35px',
            display: 'flex',
            alignContent: 'center',
            [theme.breakpoints.down('md')]: {
                padding: '5px',
                width: 'fit-content',
            },
        }
    }));
    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <div>
                <Box display="flex" p={1}>
                    <Box p={1} flexShrink={1} flexGrow={1}>
                        <Card className={classes.root}>
                            <div className={classes.details}>
                                <CardContent className={classes.card}>
                                    <div className={classes.controls}>
                                        {/* Headline */}
                                        <Typography variant="overline" className={"MuiTypography--heading"} style={{ lineHeight: 0 }}>
                                            {individualNewsArticle.headline.main}
                                        </Typography>
                                        <br />
                                        {/* Article Snippet */}
                                        <Typography variant="caption" className={"MuiTypography--subheading"}>
                                            {individualNewsArticle.snippet}
                                        </Typography>
                                        <br />
                                        {/* Link to actual article on NYTimes Website */}
                                        <Link href={individualNewsArticle.web_url} target="_blank" rel="noopener noreferrer" variant="caption">
                                            {individualNewsArticle.web_url}
                                        </Link>
                                    </div>
                                </CardContent>
                            </div>
                        </Card>
                    </Box>
                </Box>
            </div>
        </ThemeProvider>
    )
}

export default CarouselSlide;
