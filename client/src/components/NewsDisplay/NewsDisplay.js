import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import CarouselDisplay from "../CarouselDisplay/CarouselDisplay";
import Box from '@material-ui/core/Box';

function NewsDisplay(props) {

    const useStyles = makeStyles((theme) => ({
        root: {
            border: 0,
            display: 'flex',
            height: 'fit-content'
        }
    }));

    const classes = useStyles();

    // Confirming if there was or wasn't a response before rendering
    // If a response exists...
    if (props.newsResultProp.response) {

        // Getting the response and extracting the array of news objects
        var arrayOfNewsArticleObjects = props.newsResultProp.response.docs

        return (
            <div className={classes.root} style={{ width: '100%' }}>
                <Box display="flex" p={1}>
                    <Box p={1} flexShrink={1} flexGrow={1}>
                        <div>
                            {/* Letting the user know their most recent search */}
                            <Typography variant="body2">
                                Your most recent search was for "{props.searchHistorySingle.recentNewsSearch}", filtered by "{props.searchHistorySingle.unitedStateFilter}"
                            </Typography>

                            {/* THE carousel */}
                            <CarouselDisplay newsArray={arrayOfNewsArticleObjects} />

                        </div>
                    </Box>
                </Box>
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