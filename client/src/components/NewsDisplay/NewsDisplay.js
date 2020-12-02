import React from 'react';

function NewsDisplay(props) {

    // Currently only returning the first article as a basic div
    // Future refinements:
    // MAP OVER DATA
    // Return a component, where each article is passed as a prop
    // Carousel likely imported and used here

    if (props.newsResultProp.response) {
        return (
            <div>
                <h2>{props.newsResultProp.response.docs[0].headline.main} </h2>
                <p> {props.newsResultProp.response.docs[0].snippet}</p>
                <a href={props.newsResultProp.response.docs[0].web_url}>{props.newsResultProp.response.docs[0].web_url}</a>
            </div>
        );
    }
    else {
        return (
            <div>
                <p>Haven't searched for news yet</p>
            </div>
        )
    }
}

export default NewsDisplay;