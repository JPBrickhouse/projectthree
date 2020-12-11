import React from 'react';

function TrendingSingle (props) {
    return (
        <div>
            <p>{props.newsSearch}, filtered by {props.unitedState}</p>
        </div>
    );
}
 
export default TrendingSingle;
