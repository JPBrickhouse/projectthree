import React from "react";
import Link from '@material-ui/core/Link';
import { Card, CardContent, makeStyles, Typography } from "@material-ui/core";


function CarouselSlide(props) {
    const individualNewsArticle = props.content

    const useStyles = makeStyles((theme) => ({
        root: {
            border: 0,
            display: 'flex',
            flex: '1 0 auto',

        },
        controls: {
            width: 'fit-content',
            border: `1px solid ${theme.palette.main}`,
            textAlign: 'center',
            alignItems: 'center',
            background: '#A8DADC',
        },
        card: {
            borderRadius: 5,
            padding: '35px 20px',
            display: 'flex',
            alignContent: 'center',
            background: '#A8DADC',
        }
    }));
    const classes = useStyles();

    return (
        <div>
            <Card className={classes.root}>
                <div className={classes.details}>
                    <CardContent className={classes.card}>
                        <div className={classes.controls}>
                            {/* Headline */}
                            <Typography variant="h6" >
                                {individualNewsArticle.headline.main}
                            </Typography>

                            {/* Article Snippet */}
                            <Typography variant="body1">
                                {individualNewsArticle.snippet}
                            </Typography>

                            {/* Link to actual article on NYTimes Website */}
                            <Link href={individualNewsArticle.web_url} target="_blank" rel="noopener noreferrer">
                                {individualNewsArticle.web_url}
                            </Link>
                        </div>
                    </CardContent>
                </div>
            </Card>
        </div>
    )
}

export default CarouselSlide;
