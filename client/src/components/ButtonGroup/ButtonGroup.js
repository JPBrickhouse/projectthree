import React from 'react';
import './ButtonGroup.css';

import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

// Importing styles from Material-ui
import { makeStyles, styled, createMuiTheme, ThemeProvider, useTheme } from "@material-ui/core/styles";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import Card from '@material-ui/core/Card';

// Importing the ForeverFactButton component
import ForeverFactButton from "../ForeverFactButton/ForeverFactButton"

function BtnGrp() {

    const theme = createMuiTheme({
        breakpoints: {
            values: {
                xs: 0,
                sm: 600,
                md: 960,
                lg: 1280,
                xl: 1920,
            },
        },
    })

    const useStyles = makeStyles(() => ({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            minWidth: 300,
            maxWidth: '95%',
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
        },
        responsivegroup: {

        }
    }));

    const FactsButton = styled(Button)({
        maxWidth: '100%',
        boxShadow: '0 3px 5px 2px #4A4E69',
        color: 'white',
        height: 200,
        border: '2px solid #4A4E69',
        opacity: 0.9,
    },
    );

    const classes = useStyles();

    // -------------------------------------------------------
    return (
        <div className={classes.root}>
            <Card>
                <ButtonGroup
                    variant="outlined"
                    orientation="horizontal"
                    style={{ maxWidth: '100%' }}
                >

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
                            <ForeverFactButton value="covid" />
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
                            <ForeverFactButton value="senator" />
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
                            <ForeverFactButton value="general" />
                        </Link>
                    </FactsButton>

                </ButtonGroup>

            </Card>
        </div>
    )
}

export default BtnGrp;