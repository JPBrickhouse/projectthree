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
            display: 'flex',
            height: '100%',
            padding: '0'
        },
        details: {
            flexDirection: 'column',
            flex: '1 0 auto',
            padding: '5px',
            alignItems: 'flex-start',
        },
        controls: {
            width: '100%',
            display: 'flex',
            // padding: '10px 30px 30px 0px',
            transition: "0.3s",
            [theme.breakpoints.down('xs')]: {
                padding: '5px 10px 10px 0px',
                flex: 'none',
            },
            [theme.breakpoints.down('sm')]: {
                paddingTop: '10px',
            },
            [theme.breakpoints.between('md', 'lg')]: {
                paddingLeft: '0px',
            }
        },
        typography: {
            lineHeight: 1,
            letterSpacing: 0,
            padding: '10px 30px 10px 0px',
            [theme.breakpoints.between('xs', 'sm')]: {
                textTransform: 'capitalize',
                padding: '5px 10px 10px 0px',
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
                            <CardContent classNames={classes.details} style={{ width: '100%', padding: '0px' }}>
                                <Card className={classes.controls} style={{ padding: '0px' }}>
                                    {/* Column 1 - Full Search History from EVERYONE */}
                                    <Typography className={classes.typography} variant="overline" display="relative">
                                        Everyone's searches:
                                                </Typography>
                                    <Typography className={classes.typography} style={{ marginLeft: "0px" }} variant="overline" display="relative" component="ul">
                                        {fullSearchHistory.map(searchItem =>
                                            <TrendingSingle
                                                key={searchItem._id}
                                                newsSearch={searchItem.newsSearch}
                                                unitedState={searchItem.unitedState}
                                            />
                                        )}
                                    </Typography>
                                    <Divider orientation="vertical" flexItem />
                                    {/* Column 2 - Search History from only the USER */}
                                    <Typography variant="overline" className={classes.typography} gutterBottom>
                                        Your searches:
                                                        </Typography>
                                    <Typography style={{ marginLeft: "2px" }} variant="overline" className={classes.typography} component="ul">
                                        {userSearchHistory.map(searchItem =>
                                            <TrendingSingle
                                                key={searchItem._id}
                                                newsSearch={searchItem.newsSearch}
                                                unitedState={searchItem.unitedState}
                                            />
                                        )}
                                    </Typography>
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
