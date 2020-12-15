// Importing React and Hooks
import React, { useEffect, useState } from "react"

import { makeStyles, createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import { Card, CardContent, Divider, ThemeProvider, Typography } from "@material-ui/core";
import 'fontsource-roboto';

// This is the SenatorApiCall function and we are passing it props
function SenatorApiCall(props) {
    let theme = createMuiTheme({
        palette: {
            primary: {
                light: '#9A8C98',
                main: '#4A4E69',
                text: '#22223B'
            },
            secondary: {
                main: '#C9ADA7'
            }
        }
    })
    theme = responsiveFontSizes(theme);
    const useStyles = makeStyles((theme) => ({
        breakpoints: {
            values: {
                xs: 0,
                sm: 600,
                md: 960,
                lg: 1280,
                xl: 1920,
            },
        },
        root: {
            border: 0,
            display: 'flex',
        },
        details: {
            flexDirection: 'column',
        },

        controls: {
            width: 'fit-content',
            flex: '1 0 auto',
            display: 'flex',
            alignItems: 'center',
            // paddingLeft: theme.spacing(1),
            // paddingBottom: theme.spacing(1),
        },
        // cover: {
        //     height: 150,
        //     margin: "10px auto"
        // },
        typography: {
            listStyleType: 'none',
            margin: '20px',
            alignText: 'center',
            [theme.breakpoints.between('xs', 'sm')]: {
                letterSpacing: 0,
                textTransform: 'capitalize',
                paddingLeft: '5px'
            }
        }
    }))

    const classes = useStyles();
    const [stateAndSenatorData, setStateAndSenatorData] = useState({
        firstSenator: {},
        secondSenator: {}
    })

    // useEffect that conditionally runs when props.usstateAbbrev changes
    useEffect(() => {

        // Also adding a conditional if statement to confirm that props.usstateAbbrev isn't blank/empty
        // That way there aren't any unexplained results and/or errors when the API call is made
        if (isStateAbbreviationNotEmpty(props.usstateAbbrev)) {
            // Making the api call to fetch the senator data
            fetch("/api/externalRoutes/senators/" + props.usstateAbbrev)
                .then(response => response.json())
                .then(data => {
                    const firstSenateId = data.results[0].twitter_id;
                    const secondSenateId = data.results[1].twitter_id
                    // console.log(firstSenateId, secondSenateId)

                    setStateAndSenatorData({
                        firstSenator: data.results[0],
                        secondSenator: data.results[1]
                    });
                })
        }
    }, [props.usstateAbbrev])

    // Display senator name and party in parentheses. Also add links to the senators' twitter accounts
    if (isStateAbbreviationNotEmpty(props)) {
        return (
            <ThemeProvider theme={theme}>
                <div style={{ width: '100%' }}>
                    <Card className={classes.root}>
                        <div className={classes.details}>
                            <CardContent className={classes.controls}>
                                <Typography className={classes.typography} variant="overline" component="ul">
                                    <a href={"https://www.twitter.com/" + stateAndSenatorData.firstSenator.twitter_id} target="_blank" rel="noopener noreferrer"> {stateAndSenatorData.firstSenator.name} ({stateAndSenatorData.firstSenator.party})</a>
                                    <Divider orientation="vertical" flexItem />
                                </Typography>
                                <Typography className={classes.typography} variant="overline" component="ul">
                                    <a href={"https://www.twitter.com/" + stateAndSenatorData.secondSenator.twitter_id} target="_blank" rel="noopener noreferrer"> {stateAndSenatorData.secondSenator.name} ({stateAndSenatorData.secondSenator.party})</a>
                                </Typography>
                            </CardContent>
                        </div>
                    </Card>
                </div>
            </ThemeProvider>
        )
    } else {
        return null;
    }
}

function isStateAbbreviationNotEmpty(usstateAbbrev) {
    return usstateAbbrev !== "";
}

export default SenatorApiCall
