import React from 'react';

import IndividualNews from "../IndividualNews/IndividualNews"

function NewsDisplay(props) {
    // Confirming if there was or wasn't a response before rendering
    // If a response exists...
    if (props.newsResultProp.response) {

        // Getting the response and extracting the array of news objects
        var arrayOfNewsArticleObjects = props.newsResultProp.response.docs

        return (
            <div>
                {/* Letting the user know their most recent search */}
                <p>Your most recent search was for "{props.searchHistorySingle.recentNewsSearch}", filtered by "{props.searchHistorySingle.recentNewsSearch}"</p>

                {/* Mapping over the array of news objects and returning each individual news item */}
                {arrayOfNewsArticleObjects.map(newsArticle => {
                    return <IndividualNews passingDownNews={newsArticle} key={newsArticle.web_url} />
                })}
            </div>
        );
    }
    // If a response doesn't exist
    else {
        return (
            <div>
                <p>Haven't searched for news yet</p>
            </div>
        )
    }
}

export default NewsDisplay;