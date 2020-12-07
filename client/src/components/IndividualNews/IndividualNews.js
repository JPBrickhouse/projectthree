import React from 'react';

function IndividualNews(props) {
    var eachNewsArticle = props.passingDownNews
    
    return (
        <div>
            <h2>{eachNewsArticle.headline.main}</h2>
            <p> {eachNewsArticle.snippet}</p>
            <a href={eachNewsArticle.web_url} target="_blank" rel="noopener noreferrer">{eachNewsArticle.web_url}</a>
        </div>
    )
}

export default IndividualNews;