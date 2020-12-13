import React from 'react';

function TrendingSingle (props) {
    return (
        <div>
            <li>{props.newsSearch}, filtered by {props.unitedState}</li>
        </div>
    );
}
 
export default TrendingSingle;
