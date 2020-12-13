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
            border: 0,
        },
        details: {
            display: 'flex',
            flexDirection: 'column',
            padding: '0px 60px',
            color: '#1D3557',
            backgroundColor: '#F1FAEE',
        },
        content: {
            fontSize: 12,
            flex: '1 0 auto',

        },
        controls: {
            minWidth: '100%',
            display: 'flex',
        },
    }));
    const classes = useStyles();

    const fullSearchHistory = props.fullsearch
    const userSearchHistory = props.usersearch

    // console.log(fullSearchHistory, userSearchHistory)

    return (
        <div className={classes.root}>
            <Card className={classes.details}>
                <CardContent>

                    {/* Title Header */}
                    <Typography variant="h5" style={{ fontWeight: "bold" }}>
                        Trending News
                    </Typography>

                    <Card className={classes.controls}>
                        <div className={classes.content}>
                            {/* Column 1 - Full Search History from EVERYONE */}
                            <h3>Everyone's searches:</h3>
                            <ul>
                                {fullSearchHistory.map(searchItem =>
                                    <TrendingSingle
                                        key={searchItem._id}
                                        newsSearch={searchItem.newsSearch}
                                        unitedState={searchItem.unitedState}
                                    />
                                )}
                            </ul>
                        </div>
                        <Divider orientation="vertical" flexItem />
                        <div className={classes.content}>
                            {/* Column 2 - Search History from only the USER */}
                            <h3>Your searches:</h3>
                            <ul>
                                {userSearchHistory.map(searchItem =>
                                    <TrendingSingle
                                        key={searchItem._id}
                                        newsSearch={searchItem.newsSearch}
                                        unitedState={searchItem.unitedState}
                                    />
                                )}
                            </ul>
                        </div>
                    </Card>
                </CardContent>
            </Card>
        </div>
    )
}

export default TrendingNews;
