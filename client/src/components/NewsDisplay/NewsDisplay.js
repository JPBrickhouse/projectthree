import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import CarouselDisplay from "../CarouselDisplay/CarouselDisplay"

function NewsDisplay(props) {
    const useStyles = makeStyles((theme) => ({
        root: {
            border: 0,
            display: 'flex',
            height: '450px',
        },
        details: {
            display: 'flex',
            flexDirection: 'column',
        },
        content: {
            flex: '1 0 auto',
        },
        controls: {
            width: 'fit-content',
            border: `1px solid ${theme.palette.main}`,
            display: 'flex',
            textAlign: 'center',
            paddingLeft: theme.spacing(1),
            paddingBottom: theme.spacing(1),
        },
    }));

    const classes = useStyles();

    // Confirming if there was or wasn't a response before rendering
    // If a response exists...
    if (props.newsResultProp.response) {

        // Getting the response and extracting the array of news objects
        var arrayOfNewsArticleObjects = props.newsResultProp.response.docs

        return (
            <div className={classes.root}>
                <div className={classes.wrapper}>

                    {/* Letting the user know their most recent search */}
                    <Typography variant="p">
                        Your most recent search was for "{props.searchHistorySingle.recentNewsSearch}", filtered by "{props.searchHistorySingle.unitedStateFilter}"
                    </Typography>

                    {/* THE carousel */}
                    <CarouselDisplay newsArray={arrayOfNewsArticleObjects}/>

                </div>
            </div>
        );
    }
    // If a response doesn't exist
    else {
        return (
            <div>
                <p>Haven't searched for news yet</p>
            </div>
        )
    }
}

export default NewsDisplay;