import React from "react";
import Typography from "@material-ui/core/Typography";
import 'fontsource-roboto';
import { makeStyles, ThemeProvider, createMuiTheme, styled } from "@material-ui/core/styles";


function Header() {

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
    });
    const useStyles = makeStyles(() => ({
        header: {
            width: '100%',
            margin: '0px',
            justify: 'center',
            marginBottom: '0px',
            paddingBottom: '0px'
        },
    }))

    const classes = useStyles();

    return (
        <div className={classes.header}
            style={{ marginBottom: '0px' }}>
            <Typography variant="h3" style={{ color: "#5A189A", fontFamily: " 'Roboto', sans serif", fontWeight: "bold" }}>
                Select A State
            </Typography>
        </div>
    )
};

export default Header;