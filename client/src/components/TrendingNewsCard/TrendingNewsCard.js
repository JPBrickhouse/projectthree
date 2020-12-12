import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from '@material-ui/core';
import 'fontsource-roboto';
import Divider from '@material-ui/core/Divider';

import TrendingSingle from "../TrendingSingle/TrendingSingle"

function TrendingNews(props) {

    const useStyles = makeStyles((theme) => ({
        root: {
            // margin: '20px 30px',
            border: 0,
            // display: 'flex',
            // boxShadow: '0 3px 5px 2px #4A4E69',
        },
        details: {
            display: 'flex',
            flexDirection: 'column',
            padding: '0px 60px',
        },
        content: {
            fontSize: 12,
            flex: '1 0 auto',

        },
        controls: {
            minWidth: '100%',
            display: 'flex',
            // textAlign: 'center',
        },
    }));
    const classes = useStyles();

    const fullSearchHistory = props.fullsearch
    const userSearchHistory = props.usersearch

    console.log(fullSearchHistory, userSearchHistory)

    return (
        <div className={classes.root}>
            <Card className={classes.details}>
                <CardContent>

                    {/* Title Header */}
                    <Typography variant="h6">
                        Trending News
                        </Typography>

                    <Card className={classes.controls}>
                        <div className={classes.content}>
                            {/* Column 1 - Full Search History from EVERYONE */}
                            {fullSearchHistory.map(searchItem =>
                                <TrendingSingle
                                    key={searchItem._id}
                                    newsSearch={searchItem.newsSearch}
                                    unitedState={searchItem.unitedState}
                                />
                            )}
                        </div>
                        <Divider orientation="vertical" flexItem />
                        <div className={classes.content}>
                            {/* Column 2 - Search History from only the USER */}
                            {userSearchHistory.map(searchItem =>
                                <TrendingSingle
                                    key={searchItem._id}
                                    newsSearch={searchItem.newsSearch}
                                    unitedState={searchItem.unitedState}
                                />
                            )}
                        </div>
                    </Card>
                </CardContent>
            </Card>
        </div>
    )
}

export default TrendingNews;
