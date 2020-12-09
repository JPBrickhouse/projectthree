import React from 'react';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import Link from '@material-ui/core/Link';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

function IndividualNews(props) {
    const useStyles = makeStyles((theme) => ({
        root: {
            border: 0,
            // display: 'flex',
        },
        details: {
            display: 'flex',
            // flexDirection: 'column',
        },
        content: {
            flex: '1 0 auto',
        },
        media: {
            height: '150px',
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
                        {/* <Typography variant="link"> */}
                        <Link href={eachNewsArticle.web_url} target="_blank" rel="noopener noreferrer">
                            {eachNewsArticle.web_url}
                        </Link>
                        {/* </Typography> */}
                    </CardContent>
                </div>
            </CardActionArea>
        </Card>
        // <div className={classes.root}>
        //     <div className={classes.wrapper}>
        //         <h2>{eachNewsArticle.headline.main}</h2>
        //         <p> {eachNewsArticle.snippet}</p>
        //         <a href={eachNewsArticle.web_url} target="_blank" rel="noopener noreferrer">{eachNewsArticle.web_url}</a>
        //     </div>
        // </div>
    )
}

export default IndividualNews;