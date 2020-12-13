import React from "react";
import Typography from "@material-ui/core/Typography";
import 'fontsource-roboto';
import { makeStyles, ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import "./Header.css";


function Header() {

    // Material UI theme constant
    const theme = createMuiTheme({
        typography: {
            fontFamily: ['Anton',
                'sans serif'
            ].join(','),
            fontSize: 22,

        },
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
    const useStyles = makeStyles(() => ({
        header: {
            maxWidth: '100%',
            margin: '0px',
            display: 'inline',
            marginBottom: '0px',
            paddingBottom: '0px',
        },
    }))

    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.header}
                style={{ marginBottom: '0px' }}>
                <Typography variant="h3" align="left" style={{ color: "#1d3557" }}>
                    Select A State
                </Typography>
            </div>
        </ThemeProvider>
    )
};

export default Header;