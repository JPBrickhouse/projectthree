import React from 'react';
import './ButtonGroup.js';

import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

// Importing styles from Material-ui
import { makeStyles, styled } from "@material-ui/core/styles";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

// Importing the ForeverFactButton component
import ForeverFactButton from "../ForeverFactButton/ForeverFactButton"

function BtnGrp() {

    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            minWidth: 300,
            width: '100%',
        },
        image: {
            position: 'relative',
            height: 200,
            [theme.breakpoints.down('md')]: {
                width: '100% !important', // Overrides inline-style
                height: 100,
            },
            '&:hover, &$focusVisible': {
                zIndex: 1,
                '& $imageBackdrop': {
                    opacity: 0.15,
                },
                '& $imageMarked': {
                    opacity: 0,
                },
                '& $imageTitle': {
                    border: '4px solid currentColor',
                },
            },
        },
        focusVisible: {},
        imageButton: {
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: theme.palette.common.white,
        },
        imageBackdrop: {
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundColor: theme.palette.common.black,
            opacity: 0.4,
            transition: theme.transitions.create('opacity'),
        },
        imageTitle: {
            position: 'relative',
            padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
        },
        imageMarked: {
            height: 3,
            width: 18,
            backgroundColor: theme.palette.common.white,
            position: 'absolute',
            bottom: -2,
            left: 'calc(50% - 9px)',
            transition: theme.transitions.create('opacity'),
        },
    }));

    const FactsButton = styled(Button)({
        border: 0,
        width: '100%',
        fontSize: 20,
        boxShadow: '0 3px 5px 2px #4A4E69',
        color: 'white',
        height: 200,
        padding: '5px 30px',

    });

    const classes = useStyles();

    // ---------------------------------------------------------------
    // A function - to be passed down - that will run any time a quick search button
    // is clicked and will update the state of newsSearchEntry to be whatever the
    // value of the quick search button is set to. 
    const foreverFacts = (event) => {
        console.log(event.target.value)
    }


    return (
        <Card variant="outlined">
            <div className={classes.root}>

                <ButtonGroup variant="contained">
                    {/* <ButtonBase
                        focusRipple
                        className={classes.image}
                        focusVisibleClassName={classes.focusVisible}
                    >
                        <span
                            className={classes.imageSrc}
                        />
                        <span
                            className={classes.imageBackdrop}
                        /> */}
                    <FactsButton
                        className={classes.imageTitle}
                        size="large"
                        style={{
                            height: 200,
                            backgroundImage: `url(${process.env.PUBLIC_URL + '/images/covid_count.jpg'})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center 40%',
                            fontSize: 20
                        }}
                        color="primary"
                    >
                        <Link to="/covidforeverfact">
                            <ForeverFactButton onClick={foreverFacts} value="covid" />
                        </Link>
                    </FactsButton>
                    <FactsButton
                        className={classes.imageTitle}
                        size="large"
                        style={{
                            height: 200,
                            backgroundImage: `url(${process.env.PUBLIC_URL + '/images/senators_pexels.jpg'})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center 40%',
                            fontSize: 20
                        }}
                        color="primary"
                    >
                        <Link to="/senatorforeverfact">
                            <ForeverFactButton onClick={foreverFacts} value="senator" />
                        </Link>
                    </FactsButton>
                    <FactsButton
                        className={classes.imageTitle}
                        size="large"
                        style={{
                            height: 200,
                            backgroundImage: `url(${process.env.PUBLIC_URL + '/images/neon_flag.jpg'})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center 40%',
                            fontSize: 20
                        }}
                        color="primary"
                    >
                        <Link to="/generalforeverfact">
                            <ForeverFactButton onClick={foreverFacts} value="general" />
                        </Link>
                    </FactsButton>
                    {/* </ButtonBase> */}
                </ButtonGroup>
            </div>
        </Card>
    )


}

export default BtnGrp;