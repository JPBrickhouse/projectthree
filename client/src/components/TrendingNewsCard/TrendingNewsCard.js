import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from '@material-ui/core';
import 'fontsource-roboto';

import TrendingSingle from "../TrendingSingle/TrendingSingle"

function TrendingNews(props) {
    const useStyles = makeStyles(() => ({
        news: {
            // borderRadius: 5,
            padding: '10px 50px',
            margin: '30px 25px',
            minWidth: '100%',
            height: '100px',
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            boxShadow: '0 3px 5px 2px #4A4E69',
        },
    }));
    const classes = useStyles();

    const fullSearchHistory = props.fullsearch
    const userSearchHistory = props.usersearch

    console.log(fullSearchHistory,userSearchHistory)

    return (
        <div>
            <Card className={classes.news}>
                <CardContent>

                    {/* Title Header */}
                    <Typography variant="body1">
                        Trending News
                    </Typography>

                    {/* Column 1 - Full Search History from EVERYONE */}
                    {fullSearchHistory.map(searchItem => {
                        return (<TrendingSingle
                            key={searchItem.id}
                            newsSearch={searchItem.newsSearch}
                            unitedState={searchItem.unitedState}
                        />)
                    })}

                    {/* Column 2 - Search History from only the USER */}
                    {userSearchHistory.map(searchItem => {
                        return (<TrendingSingle
                            key={searchItem.id}
                            newsSearch={searchItem.newsSearch}
                            unitedState={searchItem.unitedState}
                        />)
                    })}

                </CardContent>
            </Card>
        </div>
    )
}

export default TrendingNews;
