import React from 'react';

import Link from '@material-ui/core/Link';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

function IndividualNews(props) {
    const useStyles = makeStyles((theme) => ({
        root: {
            border: 0,
        },
        details: {
            display: 'flex',
        },
        content: {
            flex: '1 0 auto',
        },
        controls: {
            width: 'fit-content',
            border: `1px solid ${theme.palette.main}`,
            // display: 'flex',
            textAlign: 'center',
            alignItems: 'center',
            paddingLeft: theme.spacing(1),
            paddingBottom: theme.spacing(1),
        },
    }));

    const classes = useStyles();


    var eachNewsArticle = props.passingDownNews

    return (
        <div>
            <Card className={classes.root}>
                <CardActionArea>
                    <div className={classes.details}>
                        <CardContent className={classes.controls}>
                            <Typography variant="h6">
                                {eachNewsArticle.headline.main}
                            </Typography>
                            <Typography variant="p">
                                {eachNewsArticle.snippet}
                            </Typography>
                            <Link href={eachNewsArticle.web_url} target="_blank" rel="noopener noreferrer">
                                {eachNewsArticle.web_url}
                            </Link>
                        </CardContent>
                    </div>
                </CardActionArea>
            </Card>
        </div>
    )
}

export default IndividualNews;