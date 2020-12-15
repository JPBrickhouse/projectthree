// Importing React and Hooks
import React, { useEffect, useState } from "react"

import { makeStyles, ThemeProvider, createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import { Box, Card, CardContent, Typography } from "@material-ui/core";
import 'fontsource-roboto';

// -----------------------------------------------------------
// REFERENCE for making the API call
// 
// Sourcing the information from the Covid Tracking Project by The Atlantic
// - https://covidtracking.com/
// - https://covidtracking.com/data
// - https://covidtracking.com/data/api
// 
// Mozilla documentation about the fetch method
// https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch
//
// Example Call:
// URL: "https://api.covidtracking.com/v1/states/" + state + "/current.json"
// -----------------------------------------------------------

// This is the ApiCall function and we are passing it props
function ApiCall(props) {
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
    });
    theme = responsiveFontSizes(theme);

    const useStyles = makeStyles((theme) => ({
        root: {
            border: 0,
            height: '100%'
        },
        controls: {
            width: 'fit-content',
            display: 'flex',
            alignItems: 'center',
            transition: "0.3s",
            padding: '20px 30px 10px 30px',
            [theme.breakpoints.down('sm')]: {
                padding: '10px 15px 5px 15px',

            }
        },
        details: {
            flexDirection: 'column',
            flex: '1 0 auto',
        },
        typography: {
            listStyleType: 'none',
            lineHeight: 1,
            [theme.breakpoints.between('xs', 'sm')]: {
                letterSpacing: 0,
                textTransform: 'capitalize',
                padding: '10px',
            }
        }
    }))

    const classes = useStyles();

    // State object with hooks
    const [stateAndCovidData, setStateAndCovidData] = useState({
        covidData: {},
    })

    // useEffect that conditionally runs when props.usstateAbbrev changes
    useEffect(() => {
        // Also adding a conditional if statement to confirm that props.usstateAbbrev isn't blank/empty
        // That way there aren't any unexplained results and/or errors when the API call is made
        if (props.usstateAbbrev !== "") {
            // Making the api call to fetch the Covid Data (cases, etc.)
            fetch("https://api.covidtracking.com/v1/states/" + props.usstateAbbrev + "/current.json")
                .then(response => response.json())
                .then(data => {
                    setStateAndCovidData({
                        covidData: data,
                    })
                })
        }
    }, [props.usstateAbbrev])

    return (
        <ThemeProvider theme={theme}>
            <div
                className={classes.root}
                style={{ width: '100%' }}>
                <Box display="flex" p={1}>
                    <Box p={1} flexShrink={1} flexGrow={1}>
                        <Card className={classes.details}>
                            <CardContent className={classes.controls}>
                                <Typography className={classes.typography} variant="overline" display="block" component="ul">
                                    <li>Positive cases: {stateAndCovidData.covidData.positive}</li>
                                    <li>Currently hospitalized: {stateAndCovidData.covidData.hospitalizedCurrently}</li>
                                    <li>Current deaths: {stateAndCovidData.covidData.death}</li>
                                </Typography>
                            </CardContent>
                            {/* -------------------------------------------- */}
                        </Card>
                    </Box>
                </Box>
            </div>
        </ThemeProvider>
    )
}

export default ApiCall