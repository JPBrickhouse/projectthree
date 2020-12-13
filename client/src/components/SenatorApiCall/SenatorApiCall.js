// Importing React and Hooks
import React, { useEffect, useState } from "react"

import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Divider from '@material-ui/core/Divider';
import 'fontsource-roboto';

// This is the SenatorApiCall function and we are passing it props
function SenatorApiCall(props) {
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
            height: 150,
            margin: "auto"
        },
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
            <Card className={classes.root}>
                <CardActionArea>
                    <div className={classes.details}>
                        <CardContent className={classes.controls}>
                            <Typography style={{ listStyleType: "none" }} variant="body1" color="textSecondary" component="ul">
                                <a href={"https://www.twitter.com/" + stateAndSenatorData.firstSenator.twitter_id} target="_blank" rel="noopener noreferrer"> {stateAndSenatorData.firstSenator.name} ({stateAndSenatorData.firstSenator.party})</a>
                                <Divider orientation="vertical" flexItem />
                                <a href={"https://www.twitter.com/" + stateAndSenatorData.secondSenator.twitter_id} target="_blank" rel="noopener noreferrer"> {stateAndSenatorData.secondSenator.name} ({stateAndSenatorData.secondSenator.party})</a>
                            </Typography>
                        </CardContent>
                    </div>
                </CardActionArea>
            </Card>
        )
    } else {
        return null;
    }
}

function isStateAbbreviationNotEmpty(usstateAbbrev) {
    return usstateAbbrev !== "";
}

export default SenatorApiCall
