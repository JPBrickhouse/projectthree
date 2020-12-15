import React from 'react'
import './ForeverFactDisplay.css'

import { makeStyles, ThemeProvider, createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import 'fontsource-roboto';



function ForeverFactDisplay(props) {
    // Material UI theme constant
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
            height: '100%',
            padding: '0'
        },
        details: {
            flexDirection: 'column',
            flex: '1 0 auto',
        },
        controls: {
            width: '100%',
            display: 'flex',
            transition: "0.3s",
            [theme.breakpoints.down('sm')]: {
                paddingTop: '10px',
                paddingRight: '5px',
                paddingLeft: '5px'
            },
            [theme.breakpoints.between('md', 'lg')]: {
                paddingLeft: '0px'
            }
        },
        cover: {
            height: 150,
            margin: "10px auto",
        },
        typography: {
            listStyleType: 'none',
            lineHeight: 1,
            [theme.breakpoints.between('xs', 'sm')]: {
                letterSpacing: 0,
                textTransform: 'capitalize',
                alignText: 'center',
                paddingLeft: '5px'
            }
        }
    }))

    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}
                style={{ width: '100%' }}>
                <Box display="flex" p={1}>
                    <Box p={1} flexShrink={1} flexGrow={1}>
                        <Card className={classes.details} style={{ width: '100%' }}>
                            <CardContent className={classes.controls}>
                                <Typography className={classes.typography} variant="overline" display="relative" component="ul">
                                    <li>USA Population (2019): 328687501</li>
                                    <li>Electoral Votes: 538</li>
                                    <li>Population per Electoral Vote: 610111</li>
                                </Typography>
                                <Divider orientation="vertical" flexItem />
                                <Typography className={classes.typography} variant="overline" display="relative" component="ul">
                                    <li>{props.usStateInformation.unitedStateSelected} Population (2019): {props.usStateInformation.population}</li>
                                    <li>Electoral Votes: {props.usStateInformation.electoralvotes}</li>
                                    <li>Population per Electoral Vote: {props.usStateInformation.populationpervote}</li>
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>
                </Box>
            </div>
        </ThemeProvider>
    );
}

export default ForeverFactDisplay;