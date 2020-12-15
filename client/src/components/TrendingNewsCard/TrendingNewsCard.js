import React from "react";

import { makeStyles, createMuiTheme, ThemeProvider, responsiveFontSizes } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from '@material-ui/core';
import 'fontsource-roboto';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';

import TrendingSingle from "../TrendingSingle/TrendingSingle"

function TrendingNews(props) {

    let theme = createMuiTheme();
    theme = responsiveFontSizes(theme);

    const useStyles = makeStyles((theme) => ({
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
            height: '220px',
            width: '300px',
            padding: '0'
        },
        details: {
            flexDirection: 'column',
            color: '#1D3557',
            padding: '10px 20px',
            backgroundColor: '#F1FAEE',
            [theme.breakpoints.down('sm')]: {
                padding: '5px 15px',
            },
        },
        content: {
            flexDirection: 'column',
            alignItems: 'center',
            padding: '10px 40px 30px 20px',
            flex: '1 0 auto',
            [theme.breakpoints.down('xs')]: {
                padding: '5px 10px',
                flex: 'none',
            },

        },
        controls: {
            width: '100%',
            display: 'flex',
        },
        typography: {
            // listStyleType: 'none',
            lineHeight: 1,
            [theme.breakpoints.between('xs', 'sm')]: {
                letterSpacing: 0,
                textTransform: 'capitalize',
                padding: '5px'
            }
        }
    }));
    const classes = useStyles();

    const fullSearchHistory = props.fullsearch
    const userSearchHistory = props.usersearch

    // console.log(fullSearchHistory, userSearchHistory)

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}
                style={{ width: '100%' }}
            >
                <Box display="flex" p={1}>
                    <Box p={1} flexShrink={1} flexGrow={1}>
                        <Card>
                            <CardContent style={{ padding: '0px' }}>
                                <Card className={classes.controls} style={{ width: '100%' }}>
                                    <div className={classes.content}>
                                        {/* Column 1 - Full Search History from EVERYONE */}
                                        <Typography className={classes.typography} variant="overline" gutterBottom>
                                            Everyone's searches:
                                        </Typography>
                                        <Typography className={classes.typography} style={{ marginLeft: "0px" }} variant="overline" component="ul">
                                            {fullSearchHistory.map(searchItem =>
                                                <TrendingSingle
                                                    key={searchItem._id}
                                                    newsSearch={searchItem.newsSearch}
                                                    unitedState={searchItem.unitedState}
                                                />
                                            )}
                                        </Typography>
                                    </div>
                                    <Divider orientation="vertical" flexItem />
                                    <div className={classes.content}>
                                        {/* Column 2 - Search History from only the USER */}
                                        <Typography variant="overline" className={classes.typography} gutterBottom>
                                            Your searches:
                                                </Typography>
                                        <Typography style={{ marginLeft: "0px" }} variant="overline" className={classes.typography} component="ul">
                                            {userSearchHistory.map(searchItem =>
                                                <TrendingSingle
                                                    key={searchItem._id}
                                                    newsSearch={searchItem.newsSearch}
                                                    unitedState={searchItem.unitedState}
                                                />
                                            )}
                                        </Typography>
                                    </div>
                                </Card>
                            </CardContent>
                        </Card>
                    </Box>
                </Box>
            </div>
        </ThemeProvider>
    )
}

export default TrendingNews;
