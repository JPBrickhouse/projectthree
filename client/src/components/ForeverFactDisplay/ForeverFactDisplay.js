import React from 'react'
import './ForeverFactDisplay.css'
function ForeverFactDisplay(props) {
    return (
        <div>
            <img alt="stateflag" className="photo" src={'http://flags.ox3.in/svg/us/' + props.usstateAbbrev + '.svg'} />
            <p>United States of America Population - 2019 estimate: 328687501</p>
            <p>Electoral Votes: 538</p>
            <p>Population per Electoral Vote: 610111</p>
            <p>-----------</p>
            <p>{props.usStateInformation.unitedStateSelected} Population - 2019 estimate: {props.usStateInformation.population}</p>
            <p>Electoral Votes: {props.usStateInformation.electoralvotes}</p>
            <p>Population per Electoral Vote: {props.usStateInformation.populationpervote}</p>
        </div>
    );
}

export default ForeverFactDisplay;