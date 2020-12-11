import React from 'react';
import './ButtonGroup.js';

import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

// Importing styles from Material-ui
import { makeStyles, styled } from "@material-ui/core/styles";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import Card from '@material-ui/core/Card';

// Importing the ForeverFactButton component
import ForeverFactButton from "../ForeverFactButton/ForeverFactButton"

function BtnGrp() {

    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            minWidth: 300,
            maxWidth: '95%',
        }, '&:hover, &$focusVisible': {
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
        imageTitle: {
            position: 'relative',
            padding: `${theme.spacing(1)}px ${theme.spacing(2)}px ${theme.spacing(1) + 5}px`,
        }
    }));

    const FactsButton = styled(Button)({
        width: '100%',
        boxShadow: '0 3px 5px 2px #4A4E69',
        color: 'white',
        height: 200,
        border: '2px solid #4A4E69',
        opacity: 0.9
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
        <div className={classes.root}>
            <Card>
                
                <ButtonGroup variant="outlined">
                    focusRipple
                    {/* className={classes.image} */}
                    focusVisibleClassName={classes.focusVisible}
                    className={classes.imageTitle}

                    <FactsButton
                        size="large"
                        style={{
                            backgroundImage: `url(${process.env.PUBLIC_URL + '/images/covid_count.jpg'})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center 40%',
                        }}
                        color="primary"
                    >
                        <Link to="/covidforeverfact">
                            <ForeverFactButton onClick={foreverFacts} value="covid" />
                        </Link>
                    </FactsButton>
                    
                    <FactsButton
                        size="large"
                        style={{
                            backgroundImage: `url(${process.env.PUBLIC_URL + '/images/capital_building.jpg'})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center 40%',
                        }}
                        color="primary"
                    >
                        <Link to="/senatorforeverfact">
                            <ForeverFactButton onClick={foreverFacts} value="senator" />
                        </Link>
                    </FactsButton>

                    <FactsButton
                        size="large"
                        style={{
                            backgroundImage: `url(${process.env.PUBLIC_URL + '/images/neon_flag.jpg'})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center 40%',
                        }}
                        color="primary"
                    >
                        <Link to="/generalforeverfact">
                            <ForeverFactButton onClick={foreverFacts} value="general" />
                        </Link>
                    </FactsButton>

                </ButtonGroup>
                
            </Card>
        </div>
    )
}

export default BtnGrp;