import React from "react";
import { Box, Typography } from "@material-ui/core";
import 'fontsource-roboto';
import { makeStyles, ThemeProvider, createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

import "./Header.css";


function Header() {

    // Material UI theme constant
    let theme = createMuiTheme({
        typography: {
            fontFamily: ['Anton',
                'sans serif'
            ].join(','),
            fontSize: 22,
        },
    });
    theme = responsiveFontSizes(theme);

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