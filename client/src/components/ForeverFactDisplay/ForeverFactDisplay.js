import React from 'react'
import './ForeverFactDisplay.css'

import { makeStyles, ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Divider from '@material-ui/core/Divider';
import 'fontsource-roboto';



function ForeverFactDisplay(props) {
    // Material UI theme constant
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
            textAlign: 'center',
            // alignItems: 'center',
            paddingLeft: theme.spacing(1),
            paddingBottom: theme.spacing(1),
        },
        cover: {
            width: 151,
        },
    }))

    const classes = useStyles();

    return (
        <div>
            <ThemeProvider theme={theme}>
                <Card className={classes.root}>
                    <CardActionArea>
                        <div className={classes.details}>
                            <CardMedia title="stateflag" className={classes.media} image={'http://flags.ox3.in/svg/us/' + props.usstateAbbrev + '.svg'} />
                            <CardContent className={classes.controls}>
                                <Typography style={{ listStyleType: "none" }} variant="body2" color="textSecondary" component="ul">
                                    <li>United States of America Population - 2019 estimate: 328687501</li>
                                    <li>Electoral Votes: 538</li>
                                    <li>Population per Electoral Vote: 610111</li>
                                </Typography>
                                <Divider orientation="vertical" flexItem />
                                <Typography style={{ listStyleType: "none" }} variant="body2" color="textSecondary" component="ul">
                                    <li>{props.usStateInformation.unitedStateSelected} Population - 2019 estimate: {props.usStateInformation.population}</li>
                                    <li>Electoral Votes: {props.usStateInformation.electoralvotes}</li>
                                    <li>Population per Electoral Vote: {props.usStateInformation.populationpervote}</li>
                                </Typography>
                            </CardContent>
                        </div>
                    </CardActionArea>
                </Card>
            </ThemeProvider>
        </div>
    );
}

export default ForeverFactDisplay;