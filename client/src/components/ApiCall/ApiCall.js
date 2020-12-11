// Importing React and Hooks
import React, { useEffect, useState } from "react"

import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
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
    const theme = createMuiTheme({
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
    const useStyles = makeStyles((theme) => ({
        root: {
            // minHeight: '100vh',
            border: 0,
            display: 'flex',
        },
        details: {
            display: 'flex',
            flexDirection: 'column',
        },
        content: {
            flex: '1 0 auto',
        },
        media: {
            height: '150px',
            // maxWidth: '200px',
            // display: 'flex'
        },
        controls: {
            width: 'fit-content',
            border: `1px solid ${theme.palette.main}`,
            display: 'flex',
            alignItems: 'center',
            paddingLeft: theme.spacing(1),
            paddingBottom: theme.spacing(1),
        },
        cover: {
            width: 151,
        },
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
        <Card className={classes.root}>
            <CardActionArea>
                <div className={classes.details}>
                    <CardMedia title="stateflag" className={classes.media} image={'http://flags.ox3.in/svg/us/' + props.usstateAbbrev + '.svg'} />
                    {/* -------------------------------------------- */}
                    {/* FANCY Covid Data component goes here
                    Pass down the CovidData object as a prop */}
                    <CardContent className={classes.controls}>
                        <Typography style={{ listStyleType: "none" }} variant="body1" color="textSecondary" component="ul">
                            <li>Positive cases: {stateAndCovidData.covidData.positive}</li>
                            <li>Currently hospitalized: {stateAndCovidData.covidData.hospitalizedCurrently}</li>
                            <li>Current deaths: {stateAndCovidData.covidData.death}</li>
                        </Typography>
                    </CardContent>
                    {/* -------------------------------------------- */}
                </div>
            </CardActionArea>
        </Card>
    )
}

export default ApiCall