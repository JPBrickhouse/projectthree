import React from "react";
import { Card, CardActionArea, CardContent, makeStyles, Typography } from "@material-ui/core";


function CarouselSlide(props) {
    const { backgroundColor, title } = props.content;

    const useStyles = makeStyles((theme) => ({
        root: {
            border: 0,
        },
        details: {
            display: 'flex',
        },
        content: {
            flex: '1 0 auto',
        },
        controls: {
            width: 'fit-content',
            border: `1px solid ${theme.palette.main}`,
            // display: 'flex',
            textAlign: 'center',
            alignItems: 'center',
            paddingLeft: theme.spacing(1),
            paddingBottom: theme.spacing(1),
        },
        card: {
            backgroundColor,
            borderRadius: 5,
            padding: '40px 30px',
            margin: '10px 25px',
            width: '80%',
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center'
        }
    }));
    const classes = useStyles();

    return (
        <div>
            <Card className={classes.root}>
                <CardActionArea>
                    <div className={classes.details}>
                        <CardContent className={classes.card}>
                            <Typography variant="p" >
                                {title}
                                {/* {props.propsMessage} */}
                            </Typography>
                        </CardContent>
                    </div>
                </CardActionArea>
            </Card>
        </div>
    )

}

export default CarouselSlide;