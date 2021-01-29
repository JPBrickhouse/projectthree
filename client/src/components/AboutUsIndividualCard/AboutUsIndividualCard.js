import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Card, CardContent, CardMedia, CardActionArea, CardActions, Typography, Link } from "@material-ui/core";
import 'fontsource-roboto';


const useStyles = makeStyles({
    root: {
        textAlign: 'center',
        justifyContent: 'center',
        margin: '20px 0px',
        maxWidth: 500,
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        "&:hover": {
            boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
        }
    },
    media: {
        height: 300,
    },
});

const AboutUsIndividualCard = (props) => {
    const classes = useStyles();

    return (
        <Router>
            <div>
                <Card className={classes.root}>
                    <CardMedia
                        className={classes.media}
                        image={props.githubPicURL}
                        title="GitHub Profile"
                    />
                    <CardContent>
                        <Typography variant="h5">{props.firstName}</Typography>
                        <Typography variant="h5">{props.lastName}</Typography>
                        <CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary">
                                    <Link href={props.linkedIn}>LinkedIn</Link>
                                </Button>
                                <Button size="small" color="primary">
                                    <Link href={props.github}>GitHub</Link>
                                </Button>
                                <Button size="small" color="primary">
                                    <Link href={props.portfolio}>Portfolio</Link>
                                </Button>
                            </CardActions>
                        </CardActionArea>
                    </CardContent>
                </Card>
            </div>
        </Router>
    );
}

export default AboutUsIndividualCard;