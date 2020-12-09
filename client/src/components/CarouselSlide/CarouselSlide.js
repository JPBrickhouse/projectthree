import React, { useState } from "react";
import { Card, makeStyles } from "@material-ui/core";

import NewsDisplay from "../NewsDisplay/NewsDisplay";

function CarouselSlide(props) {
    const { backgroundColor, title } = props.content;

    const useStyles = makeStyles(() => ({
        card: {
            backgroundColor,
            borderRadius: 5,
            padding: '75px 50px',
            margin: '0px 25px',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
        }
    }));
    const classes = useStyles();

    // State elements and objects with Hooks
    // const [stateOfTheStates, setStateOfTheStates] = useState({
    //     unitedStateSelected: "",
    //     regionSelected: "",
    //     abbreviation: "",
    //     population: 0,
    //     electoralvotes: 0,
    //     populationpervote: 0
    // })

    const [newsResultObject, setNewsResultObject] = useState({})

    const [mostRecentSearch, setMostRecentSearch] = useState({
        unitedStateFilter: "",
        recentNewsSearch: ""
    })

    return (
        <Card className={classes.card}>
            <NewsDisplay newsResultProp={newsResultObject} searchHistorySingle={mostRecentSearch} />
        </Card>
    )
}

export default CarouselSlide;