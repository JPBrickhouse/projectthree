import React from 'react';

import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

// Importing styles from Material-ui
import { makeStyles, ThemeProvider, createMuiTheme, styled } from "@material-ui/core/styles";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import { blue, purple } from "@material-ui/core/colors";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

// Importing the ForeverFactButton component
import ForeverFactButton from "../ForeverFactButton/ForeverFactButton"

function BtnGrp() {
    const FactsButton = styled(Button)({
        background: '#F2E9E4',
        border: 0,
        width: '100%',
        fontSize: 20,
        boxShadow: '0 3px 5px 2px #4A4E69',
        color: 'white',
        height: 60,
        padding: '5px 30px',

    });

    // ---------------------------------------------------------------
    // A function - to be passed down - that will run any time a quick search button
    // is clicked and will update the state of newsSearchEntry to be whatever the
    // value of the quick search button is set to. 
    const foreverFacts = (event) => {
        console.log(event.target.value)
    }


    return (
        <Grid item spacing={2} xs={12} sm={12} md={6} lg={6} xl={6}>
            <ButtonGroup variant="contained">
                <FactsButton
                    size="large"
                    style={{
                        height: 100,
                        width: '95%',
                        fontSize: 20
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
                        height: 100,
                        width: '95%',
                        fontSize: 20
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
                        height: 100,
                        width: '95%',
                        fontSize: 20
                    }}
                    color="primary"
                >
                    <Link to="/generalforeverfact">
                        <ForeverFactButton onClick={foreverFacts} value="general" />
                    </Link>
                </FactsButton>
            </ButtonGroup>
        </Grid>
    )


}

export default BtnGrp;